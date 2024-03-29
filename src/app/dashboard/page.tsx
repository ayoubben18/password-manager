
import {PasswordsSection} from "@/components/PasswordsSection";
import {InputSearch} from "@/components/InputSearch";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {Suspense} from "react";

const page = async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return (
        <div className='flex flex-col h-screen container gap-4 py-5'>
            <InputSearch/>
            <Suspense fallback={<div>Loading...</div>}><PasswordsSection/></Suspense>
        </div>
    );
};
 export default page