import { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: mouseX, y: mouseY });
        rafRef.current = undefined;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) {
        setIsHovering(false);
        return;
      }

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        (target.closest && (target.closest("a") || target.closest("button")));

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVisible]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovering ? "scale-150" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cursor ring */}
      <div
        className={`fixed w-8 h-8 border border-white/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovering ? "scale-150 border-white/60" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CustomCursor;
