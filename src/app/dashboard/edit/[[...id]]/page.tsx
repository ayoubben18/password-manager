import FormCard from "@/components/FormCard";
import {getPassword} from "@/app/actions";
import {redirect} from "next/navigation";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const page = async ({params}:{params:{id:number}}) => {
    const password = await getPassword(params.id)
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!password || user?.id !== password.userId) redirect('/dashboard')

    return (
        <div className=' flex items-center justify-center pt-6 h-screen'>
            <FormCard editing={true} pass={password} />
        </div>
    )
}

export default page