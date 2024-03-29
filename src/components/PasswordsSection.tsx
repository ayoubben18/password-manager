"use client"
import {getPasswords} from "@/app/actions";
import {PasswordAccordion} from "@/components/PasswordAccordion";
import {useQuery} from "@tanstack/react-query";
import {useMemo, useState} from "react";
import {useSearchStore} from "@/stores/searchStore";

export const PasswordsSection =   () => {
    const {data,isLoading} = useQuery({
        queryKey: ['passwords'],
        queryFn: () => getPasswords(),
        retry:true
    })
    const [pass, setPass] = useState(data);

    const {search}=useSearchStore()
    useMemo(() => {
        if (data && search) {
            const filteredPasswords = data.filter(p =>
                p.platform.toLowerCase().includes(search.toLowerCase())
            );
            setPass(filteredPasswords);
        } else {
            setPass(data);
        }
    }, [data, search]);

    if(isLoading){
        return <div className='text-center text-3xl font-bold'>Loading...</div>
    }
    if(pass?.length ===0 || !pass){
        return <div className='pt-5 text-center text-3xl font-bold'>No Passwords Found</div>
    }
    return (
        <div className='flex flex-col gap-2 text-2xl'>
            {pass.map(p=>(
                <PasswordAccordion
                    key={p.id}
                    id={p.id}
                    platform={p.platform}
                    password={p.password}
                    email={p.email}
                    createdAt={p.createdAt}/>
            ))}
        </div>
    );
};