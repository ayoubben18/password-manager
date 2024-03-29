"use client"
import {Input} from "@/components/ui/input";
import {useSearchStore} from "@/stores/searchStore";

export const InputSearch = () => {
    const {setSearch,search} = useSearchStore()
    console.log(search)
    return (
        <div>
            <Input
                hasSearchIcon={true}
                placeholder='Search by Platform'
                onChange={e => setSearch(e.target.value)} />
        </div>
    );
};