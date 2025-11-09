import { useEffect, useRef, useState } from "react";

// Simple CountUp component
// Props:
// - end: number (target value)
// - duration: ms (animation duration)
// - suffix: string to append (e.g., '%', '+')
// - formatThousands: boolean (format with commas)
const CountUp = ({ end = 0, duration = 1500, suffix = "", formatThousands = false }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.round((end - 0) * eased + 0);
        setValue(current);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    // If IntersectionObserver is available, trigger when visible. Otherwise start immediately.
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              start();
              if (io) io.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(node);
    } else {
      // fallback
      start();
    }

    return () => {
      if (io) io.disconnect();
    };
  }, [end, duration]);

  const format = (n) => {
    try {
      if (formatThousands) return n.toLocaleString();
    } catch (e) {
      /* ignore */
    }
    return String(n);
  };

  return (
    <span ref={ref} aria-valuenow={value}>
      {format(value)}{suffix}
    </span>
  );
};

export default CountUp;
