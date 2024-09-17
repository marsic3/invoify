import { create } from 'zustand'

export const useWizzardStore = create((set) => ({
    activeStep: 0 as number,
    setActiveStep: (step: number) => set({ activeStep: step }) as void
}))


export default useWizzardStore;
