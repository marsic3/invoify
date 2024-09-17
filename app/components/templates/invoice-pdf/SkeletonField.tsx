import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonField() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-[1.575em] w-[80px]" />
        </div>
    )
}
