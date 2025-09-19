'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { fetchProjects } from '../../lib/api'
import { Project } from '../../types'
import Pagination from '../../components/Pagination'
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
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">🚀</div>
                    <p className="text-foreground/60">Loading projects...</p>
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
                        A collection of projects I've worked on, showcasing different technologies and approaches to solving problems.
                    </p>
                </div>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {projects.map((project: Project) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.id}`}
                                    className="group relative bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:scale-[1.02] flex flex-col"
                                >
                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-md">
                                            Featured
                                        </div>
                                    )}

                                    {/* Project Image */}
                                    <div className="h-40 bg-gradient-to-br from-blue-500/10 to-purple-600/10 relative overflow-hidden">
                                        {project.images.length > 0 ? (
                                            <Image
                                                src={project.images[0]}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-5xl opacity-50">🚀</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-5 space-y-3 flex flex-col flex-1">
                                        <div>
                                            <h3 className="text-lg font-semibold group-hover:text-foreground/80 transition-colors line-clamp-1">
                                                {project.title}
                                            </h3>
                                            <p className="text-foreground/60 text-sm mt-2 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Technologies */}
                                        <div className="flex-1">
                                            <p className="text-xs text-foreground/50 mb-2">Tech Stack:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-xs bg-foreground/10 px-2 py-1 rounded-md"
                                                    >
                            {tech}
                          </span>
                                                ))}
                                                {project.technologies.length > 4 && (
                                                    <span className="text-xs text-foreground/50">
                            +{project.technologies.length - 4}
                          </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-4 pt-2">
                                            {project.demoUrl && (
                                                <span className="text-sm text-blue-500 font-medium">
                          Demo →
                        </span>
                                            )}
                                            {project.githubUrl && (
                                                <span className="text-sm text-foreground/60 font-medium">
                          GitHub →
                        </span>
                                            )}
                                        </div>
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
                            I'm working on some exciting projects. Check back soon!
                        </p>
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center mt-16 space-y-4">
                    <h2 className="text-2xl font-semibold">Like What You See?</h2>
                    <p className="text-foreground/70">
                        Let's discuss how we can work together on your next project.
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
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">🚀</div>
                    <p className="text-foreground/60">Loading projects...</p>
                </div>
            </div>
        }>
            <ProjectsContent />
        </Suspense>
    )
}