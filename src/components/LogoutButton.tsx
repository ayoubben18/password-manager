import {Button} from "@/components/ui/button";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export const LogoutButton = () => {
    return (
        <Button variant='destructive'><LogoutLink>Log out</LogoutLink></Button>
    );
};