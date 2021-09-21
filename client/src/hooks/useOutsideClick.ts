import { useEffect } from 'react';

export const useOutsideClick = (
  ref: React.MutableRefObject<any>,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    function handleClick(e: any) {
      if (ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
};
