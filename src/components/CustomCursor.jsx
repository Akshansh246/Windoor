import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [cursorState, setCursorState] = useState({
    type: 'default', // 'default' | 'link' | 'image' | 'card'
    text: '',
  });

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover (typically desktop)
    const isHoverable = window.matchMedia('(hover: hover)').matches;
    if (!isHoverable) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('custom-cursor-active');

    // Hover state tracking
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const link = target.closest('a, button, [role="button"], input[type="submit"], select, textarea');
      const cursorAttr = target.closest('[data-cursor]');

      if (cursorAttr) {
        const type = cursorAttr.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorState({ type: 'image', text: 'View' });
        } else if (type === 'explore') {
          setCursorState({ type: 'card', text: 'Explore' });
        }
      } else if (link) {
        setCursorState({ type: 'link', text: '' });
      } else {
        setCursorState({ type: 'default', text: '' });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Render loop for smooth cursor movement (lerp)
    let animationFrameId;
    const updateCursor = () => {
      // Lerp coefficient for delay (e.g. 0.15 for smooth lag)
      const lerpFactor = 0.15;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpFactor;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Check if device supports hover
  const isHoverable = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  if (!isHoverable) return null;

  let sizeClass = 'w-3 h-3 bg-windoor-primary';
  let content = null;

  if (cursorState.type === 'link') {
    sizeClass = 'w-10 h-10 border border-windoor-primary bg-transparent';
  } else if (cursorState.type === 'image' || cursorState.type === 'card') {
    sizeClass = 'w-20 h-20 bg-windoor-primary text-white flex items-center justify-center';
    content = (
      <span className="text-[10px] uppercase tracking-widest font-windoor-main font-bold select-none text-white">
        {cursorState.text}
      </span>
    );
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-9999 transition-all duration-300 ease-out flex items-center justify-center ${sizeClass}`}
      style={{
        transform: 'translate3d(0px, 0px, 0)',
        willChange: 'transform',
      }}
    >
      {content}
    </div>
  );
};

export default CustomCursor;
