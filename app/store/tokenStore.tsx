// create zustand store for tokens
import { create } from 'zustand'

export const useTokenStore = create((set) => ({
    tokens: [],
    setTokens: (tokens: any) => set({ tokens: tokens }) as void
}))

export default useTokenStore;
