import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-full w-full bg-[#FDFDFD] text-right caret-[#0094FF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:ring-0 focus:ring-offset-0 placeholder:text-xs pb-3",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
