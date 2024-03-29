import {create} from 'zustand';

export const useSearchStore = create<{search: string, setSearch: (search: string) => void}>((set) => ({
    search: '',
    setSearch: (search: string) => set({search}),
}))

