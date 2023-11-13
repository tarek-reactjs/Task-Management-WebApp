import React, {  useEffect } from 'react'
import { clearFieldsAtom } from '../store/atoms';
import { useSetAtom } from 'jotai';

export default function useOutsideComponent(ref, callback) {
  const setClearFields = useSetAtom(clearFieldsAtom)  
  useEffect(() => {
    setClearFields()
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
        //alert("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
