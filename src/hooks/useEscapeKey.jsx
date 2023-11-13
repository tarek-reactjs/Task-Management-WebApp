import React, { useCallback, useEffect} from 'react'
import { clearFieldsAtom } from '../store/atoms';
import { useSetAtom } from 'jotai';

export default function useEscapeKey(ref, callback) {
    const setClearFields = useSetAtom(clearFieldsAtom)
    const escFunction = useCallback((event) => {
        if (ref.current && event.key === "Escape") {
            setClearFields()
            callback()
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
        document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);
}
