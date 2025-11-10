import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

/**
 * Minimal reusable Modal that:
 * - Renders into document.body via portal
 * - Exposes open() and close() methods via ref
 * - Provides smooth fade + scale animation
 * - Closes on ESC and backdrop click
 *
 * Usage:
 * const ref = useRef();
 * <Modal ref={ref} title="Confirm">...</Modal>
 * ref.current.open();
 */
const Modal = forwardRef(
  ({ title, children, onConfirm, closeOnBackdrop = true }, ref) => {
    const [visible, setVisible] = useState(false); // in-DOM
    const [shown, setShown] = useState(false); // animation state

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
        // allow next tick to start animation
        requestAnimationFrame(() => setShown(true));
      },
      close: () => {
        setShown(false);
        // wait for animation to finish before removing from DOM
        setTimeout(() => setVisible(false), 220);
      },
    }));

    useEffect(() => {
      function onKey(e) {
        if (e.key === "Escape" && shown) {
          ref?.current?.close?.();
        }
      }
      if (visible) {
        document.addEventListener("keydown", onKey);
        // prevent background scroll
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }, [visible, shown, ref]);

    if (!visible) return null;

    return createPortal(
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 p-4 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <div
          onMouseDown={() => closeOnBackdrop && ref?.current?.close?.()}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Modal panel */}
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className={`relative w-full max-w-2xl mx-4 transition-all duration-220 transform ${
            shown
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-3 scale-95"
          }`}
          style={{ zIndex: 60 }}
        >
          <div className="bg-white rounded-12px shadow-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between border-b border-black/30">
              <h3 className="font-semibold text-28px ">{title}</h3>
              <button
                type="button"
                aria-label="Close"
                onClick={() => ref?.current?.close?.()}
                className="btn btn-text btn-circle btn-sm"
              >
                <span className="icon-[tabler--x] size-4" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-auto">{children}</div>

            <div className="p-4 border-t flex gap-3 justify-end">
              <button
                type="button"
                className="btn btn-soft btn-secondary"
                onClick={() => ref?.current?.close?.()}
              >
                Close
              </button>
              <button
                type="button"
          className="btn btn-primary w-full h-14 rounded-55px font-semibold text-base"
                onClick={() => {
                  if (typeof onConfirm === "function") onConfirm();
                  ref?.current?.close?.();
                }}
              >
             CONTINUE TO CHECKOUT <span className="icon-[mdi--arrow-right] ml-2 rtl-flip"></span>
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

export default Modal;
