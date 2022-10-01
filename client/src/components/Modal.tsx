import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const Modal = ({
  children,
  isOpen,
  onRequestClose,
}: PropsWithChildren<ModalProps>) => {
  const [mounted, setMounted] = useState(false);
  const handleEscKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === "Escape") {
      onRequestClose();
    }
  };

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEscKeyDown);

    return () => window.removeEventListener("keydown", handleEscKeyDown);
  }, []);

  return mounted
    ? createPortal(
        <AnimatePresence>
          {isOpen ? (
            <>
              <motion.div
                className="fixed top-0 bottom-0 left-0 right-0 z-60 bg-white/60 backdrop-blur-sm "
                onClick={onRequestClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="overlay"
              />

              <motion.div
                initial={{
                  scaleY: 0.01,
                  x: "-50%",
                  opacity: 0,
                }}
                animate={{
                  scaleY: 1,
                  opacity: 1,
                  y: "-50%",
                  x: "-50%",
                }}
                exit={{ scaleY: 0.01, opacity: 0.1 }}
                key="modal"
                transition={{
                  duration: 0.3,
                  type: "spring",
                }}
                className="fixed p-10 bg-white rounded-md w-fit h-fit z-100 top-1/2 left-1/2"
              >
                <div className="relative">
                  {children}
                  <button
                    className="absolute -right-5 -top-5"
                    type="button"
                    onClick={onRequestClose}
                  >
                    X
                  </button>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>,
        document.getElementById("portal") as HTMLElement
      )
    : null;
};

export default Modal;
