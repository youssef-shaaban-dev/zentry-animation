import LocomotiveScroll from "locomotive-scroll";
import { createContext, ReactNode, useContext } from 'react';

export const SmoothScrollContext = createContext<{ locoScroll: LocomotiveScroll | null, progress: number }>({
    locoScroll: null,
    progress: 0
});

export const SmoothSCrollProvider = ({ children }: { children: ReactNode }) => {
    const { locoScroll, progress } = useLocalScroll();

    return <SmoothScrollContext.Provider value={{ locoScroll, progress }}>
        {children}
    </SmoothScrollContext.Provider>
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);

SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothSCrollProvider.displayName = "SmoothSCrollProvider";