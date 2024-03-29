import * as React from "react"
import { FaSearch  as SearchIcon } from "react-icons/fa"; // Adjust the path to your SVG file
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasSearchIcon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, hasSearchIcon, ...props }, ref) => {
        return (
            <div className="flex items-center">
                {hasSearchIcon && <SearchIcon className="absolute ml-3" />}
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        hasSearchIcon ? "pl-10" : "", // Adjust padding to accommodate the search icon
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
