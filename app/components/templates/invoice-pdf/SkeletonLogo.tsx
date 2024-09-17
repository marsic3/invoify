import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLogo() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
        </div>
    )
}
