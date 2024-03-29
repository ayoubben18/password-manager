import {ToggleButton} from "@/components/ToggleButton";
import {LogoutButton} from "@/components/LogoutButton";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {DropDownNav} from "@/components/DropDownNav";

export const Nav = async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return (
        <div className='flex justify-between items-center py-2 px-5 border-b-2 border-neutral-900 dark:border-neutral-300'>
            <h1 className='text-3xl font-bold cursor-pointer'>
                <a href='/'>PM</a>
            </h1>
            <div className='flex gap-2'>
                <ToggleButton/>
                {user && <DropDownNav/>}
            </div>
        </div>
    );
};