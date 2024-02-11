import { useEffect, useState, useRef } from "react";

const useDetectClose = (
  initialState: boolean
): [boolean, React.MutableRefObject<HTMLDivElement | null>, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState); // isOpen 은 boolean 값 (초기값은 항상 False 이다.)
  const ref = useRef<HTMLDivElement | null>(null);

  const removeHandler = () => {
    // 기존 IsOpen 상태와 반대로 지정
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  return [isOpen, ref, removeHandler];
};

export default useDetectClose;
