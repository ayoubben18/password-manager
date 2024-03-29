"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import {PasswordType} from "@/db/schema";
import {useMutation} from "@tanstack/react-query";
import {updatePassword,createPassword} from "@/app/actions";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface Props{
    editing?:boolean
    pass?:PasswordType
}

const FormCard = ({editing,pass}:Props) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Partial<PasswordType>>()

    const router = useRouter()

    const {mutate:update,isPending}=useMutation(
        {
            mutationFn:updatePassword,
            onSuccess:()=>{
                toast.success('Successfully Updated!')
                router.push('/dashboard')
            },
            onError:(err)=>{
                toast.error('Something went wrong')
            }
        }
    )
    const {mutate:create,isPending:createIsPending}=useMutation(
        {
            mutationFn:createPassword,
            onSuccess:()=>{
                toast.success('Successfully Created!')
                router.push('/dashboard')
            },
            onError:(err)=>{
                toast.error('Something went wrong')
            }
        }
    )

    const onSubmit: SubmitHandler<Partial<PasswordType>> = (data) => {
        if(editing) update({...data,id:pass?.id,userId:pass?.userId})
        else {
            create(data)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{editing ? "Update Password" : "Create new"}</CardTitle>
                <CardDescription>Click save to apply changes</CardDescription>
            </CardHeader>
            <CardContent>
                <form className='grid w-full items-center gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Platform</Label>
                        <Input required placeholder="Platform" defaultValue={pass?.platform} {...register("platform")}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input required {...register("email")} defaultValue={pass?.email} placeholder="Email"/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input defaultValue={pass?.password} required {...register("password")} id="name" placeholder="Password"/>
                    </div>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button type='submit' disabled={isPending || createIsPending}>Save</Button>
                    </CardFooter>
                </form>
            </CardContent>

        </Card>
    )
}

export default FormCard