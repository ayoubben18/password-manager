"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Button} from "@/components/ui/button";
import {Mail} from "lucide-react";
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useRouter} from "next/navigation";
import {deletePassword} from "@/app/actions";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Props{
    id:number
    platform: string
    password: string
    email: string
    createdAt: string
}

export const PasswordAccordion = ({id,createdAt,platform,password,email}:Props) => {
    const router = useRouter()
    const {mutate,isPending}= useMutation({
        mutationFn:deletePassword,
        mutationKey:["passwords"],
        onSuccess:()=>{
            //tost deleted
            toast.success("Password Deleted !!")
            router.refresh()
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    const handleDelete =()=>{
        mutate(id)
    }
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{platform}</AccordionTrigger>
                <AccordionContent className='text-lg font-medium'>
                    email: {email}
                    <br />
                    password: {password}
                    <br />
                    created at: {createdAt.slice(0,10)}
                </AccordionContent>
                <AccordionContent className=' flex gap-2'>
                    <Button variant="outline" onClick={() => router.push(`/dashboard/edit/${id}`)}>
                        Edit
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                        Delete
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};