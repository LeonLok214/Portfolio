import { useEffect, useRef } from 'react';

export function Cursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    document.documentElement.classList.add('has-custom-cursor');
    let frame = 0;
    let x = -100;
    let y = -100;

    const render = () => {
      frame = 0;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target.closest?.('[data-cursor]');
      if (target) {
        label.textContent = target.dataset.cursor || 'OPEN';
        cursor.classList.add('is-visible');
      } else {
        cursor.classList.remove('is-visible');
      }
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const hide = () => cursor.classList.remove('is-visible');
    const down = () => cursor.classList.add('is-down');
    const up = () => cursor.classList.remove('is-down');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('blur', hide);
    document.addEventListener('mouseleave', hide);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('blur', hide);
      document.removeEventListener('mouseleave', hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      <span ref={labelRef}>VIEW</span>
    </div>
  );
}
