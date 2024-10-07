import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLogo() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
        </div>
    )
}
