interface SkeletonProps {
    className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div className={`animate-pulse bg-foreground/20 rounded ${className}`} />
    )
}

export function ProjectListSkeleton() {
    return (
        <div className="flex items-center gap-6 p-6 border-b border-foreground/10 last:border-b-0">
            {/* Content skeleton */}
            <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                {/* Tech tags skeleton */}
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-14" />
                </div>
            </div>

            {/* Links skeleton */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
            </div>
        </div>
    )
}

export function BlogListSkeleton() {
    return (
        <div className="flex items-center gap-6 p-6 border-b border-foreground/10 last:border-b-0">
            {/* Image skeleton */}
            <Skeleton className="w-24 h-24 flex-shrink-0" />

            {/* Content skeleton */}
            <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />

                {/* Tags and date skeleton */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        </div>
    )
}

export function ProjectGridSkeleton() {
    return (
        <div className="max-w-4xl mx-auto bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
                <ProjectListSkeleton key={i} />
            ))}
        </div>
    )
}

export function BlogGridSkeleton() {
    return (
        <div className="max-w-4xl mx-auto bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
                <BlogListSkeleton key={i} />
            ))}
        </div>
    )
}