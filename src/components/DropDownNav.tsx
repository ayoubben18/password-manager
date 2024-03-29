import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {LogOut, Plus, User} from "lucide-react";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const DropDownNav = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="destructive">
                    <User className=" h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem >
                    <Plus className="mr-2 h-4 w-4" />
                    <Link href='/dashboard/create'>New Password</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span><LogoutLink>Log out</LogoutLink></span>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};