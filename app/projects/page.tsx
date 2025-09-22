'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { fetchProjects } from '../../lib/api'
import { Project } from '../../types'
import Pagination from '../../components/Pagination'
import { ProjectGridSkeleton } from '../../components/Skeleton'
import { Suspense } from 'react'

function ProjectsContent() {
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const { data, isLoading, error } = useQuery({
        queryKey: ['projects', currentPage],
        queryFn: () => fetchProjects(currentPage, 9)
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-6 py-12">
                    {/* Header */}
                    <div className="text-center space-y-4 mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold">
                            My <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
                        </h1>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            A collection of projects I&apos;ve worked on, showcasing different technologies and approaches to solving problems.
                        </p>
                    </div>

                    <ProjectGridSkeleton />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <p className="text-foreground/60">Failed to load projects. Please try again later.</p>
                </div>
            </div>
        )
    }

    const { projects, pagination } = data || { projects: [], pagination: { page: 1, limit: 9, total: 0, pages: 0 } }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold">
                        My <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
                    </h1>
                    <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        A collection of projects I&apos;ve worked on, showcasing different technologies and approaches to solving problems.
                    </p>
                </div>

                {/* Projects List */}
                {projects.length > 0 ? (
                    <>
                        <div className="max-w-4xl mx-auto bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg overflow-hidden">
                            {projects.map((project: Project) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.id}`}
                                    className="group flex items-center gap-6 p-6 border-b border-foreground/10 last:border-b-0 hover:bg-foreground/10 transition-all duration-300"
                                >
                                    {/* Project Content */}
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold group-hover:text-blue-500 transition-colors">
                                                    {project.title}
                                                </h3>
                                                {project.featured && (
                                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                        Favorite
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-foreground/70 text-sm line-clamp-2 mt-1">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 6).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs bg-foreground/10 px-2 py-1 rounded-md"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 6 && (
                                                <span className="text-xs text-foreground/50">
                                                    +{project.technologies.length - 6}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex flex-col gap-2">
                                        {project.demoUrl && (
                                            <span className="text-xs bg-blue-500/10 text-blue-500 px-3 py-1 rounded-lg font-medium">
                                                Demo →
                                            </span>
                                        )}
                                        {project.githubUrl && (
                                            <span className="text-xs bg-foreground/10 text-foreground/70 px-3 py-1 rounded-lg font-medium">
                                                Code →
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="mt-12">
                                <Pagination
                                    currentPage={pagination.page}
                                    totalPages={pagination.pages}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🚧</div>
                        <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                        <p className="text-foreground/60">
                            I&apos;m working on some exciting projects. Check back soon!
                        </p>
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center mt-16 space-y-4">
                    <h2 className="text-2xl font-semibold">Like What You See?</h2>
                    <p className="text-foreground/70">
                        Let&apos;s discuss how we can work together on your next project.
                    </p>
                    <Link
                        href="/about"
                        className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        Learn More About Me
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center space-y-4 mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold">
                            My <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
                        </h1>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            A collection of projects I&apos;ve worked on, showcasing different technologies and approaches to solving problems.
                        </p>
                    </div>
                    <ProjectGridSkeleton />
                </div>
            </div>
        }>
            <ProjectsContent />
        </Suspense>
    )
}