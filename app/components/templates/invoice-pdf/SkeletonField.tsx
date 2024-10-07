import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function SkeletonField({ className }: {
    className: string
}) {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className={cn("h-4 w-[80px] ", className)} />
        </div>
    )
}
