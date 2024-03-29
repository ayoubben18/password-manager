import FormCard from "@/components/FormCard";
import {getPassword} from "@/app/actions";
import {redirect} from "next/navigation";

const page = async ({params}:{params:{id:number}}) => {
    const password = await getPassword(params.id)

    if (!password) redirect('/dashboard')

    return (
        <div className=' flex items-center justify-center pt-6'>
            <FormCard editing={true} pass={password} />
        </div>
    )
}

export default page