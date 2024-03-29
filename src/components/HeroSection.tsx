import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export const HeroSection =async() => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return (
        <div className='flex flex-col text-center container gap-4 items-center justify-center h-screen'>
            <h1 className='font-extrabold text-4xl sm:text-7xl'>PASSWORD MANAGER</h1>
            <p className='font-medium text-lg'>Manage your passwords in one place</p>
            {user ?
                <Button variant="secondary"><Link href="/dashboard">Go to Dashboard</Link></Button>
                :<div className='flex gap-2'>
                <Button variant="outline"> <Mail className="mr-2 h-4 w-4"/>
                    <LoginLink>Sign in</LoginLink>
                </Button>
                <Button variant="secondary">
                    <RegisterLink>Sign up</RegisterLink>
                </Button>
            </div>}
        </div>
    );
};