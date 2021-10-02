import React, { useEffect } from 'react';

export const useOutsideClick = (
  ref: React.MutableRefObject<any>,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  excludeRef?: React.MutableRefObject<any>
) => {
  useEffect(() => {
    function handleClick(e: any) {
      if (excludeRef?.current?.contains(e.target)) {
        return;
      }
      if (ref.current && !ref.current.contains(e.target)) {
        window.getSelection()?.removeAllRanges();
        setActive(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
};
