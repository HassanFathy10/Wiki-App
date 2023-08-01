import { useEffect, useRef } from "react";

const usePrevState = (state) => {
    const stateRef = useRef();
    useEffect(() => {
        stateRef.current = state;
    });
    return stateRef.current;
}

export default usePrevState;