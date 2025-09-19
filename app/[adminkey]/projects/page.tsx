'use client'

import { useState, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '../../../types'
import { fetchProjects, deleteProjects } from '../../../lib/api'
import Pagination from '../../../components/Pagination'

function AdminProjectsContent() {
    const params = useParams()
    const searchParams = useSearchParams()
    const queryClient = useQueryClient()

    const adminKey = params.adminkey as string
    const currentPage = Number(searchParams.get('page')) || 1

    const [selectedProjects, setSelectedProjects] = useState<string[]>([])
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['admin-projects', currentPage],
        queryFn: () => fetchProjects(currentPage, 12)
    })

    const deleteMutation = useMutation({
        mutationFn: (ids: string[]) => deleteProjects(ids, adminKey),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
            setSelectedProjects([])
            setShowDeleteConfirm(false)
        }
    })

    const toggleProject = (id: string) => {
        setSelectedProjects(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        if (!data?.projects) return
        if (selectedProjects.length === data.projects.length) {
            setSelectedProjects([])
        } else {
            setSelectedProjects(data.projects.map(p => p.id))
        }
    }

    const handleDelete = () => {
        if (selectedProjects.length > 0) {
            deleteMutation.mutate(selectedProjects)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce">🚀</div>
                    <p className="text-foreground/60">Loading projects...</p>
                </div>
            </div>
        )
    }

    const { projects, pagination } = data || { projects: [], pagination: { page: 1, limit: 12, total: 0, pages: 0 } }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Manage Projects</h1>
                    <p className="text-foreground/60 mt-1">{pagination.total} total projects</p>
                </div>
                <div className="flex items-center gap-3">
                    {selectedProjects.length > 0 && (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors font-medium"
                        >
                            Delete ({selectedProjects.length})
                        </button>
                    )}
                    <Link
                        href={`/${adminKey}/projects/create`}
                        className="bg-foreground text-background px-6 py-2 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        + Create New Project
                    </Link>
                </div>
            </div>

            {/* Projects Grid */}
            {projects.length > 0 ? (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {projects.map((project: Project) => (
                            <div
                                key={project.id}
                                className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg overflow-hidden hover:border-foreground/20 transition-all group"
                            >
                                {/* Image */}
                                <div className="h-32 relative bg-gradient-to-br from-blue-500/10 to-purple-600/10">
                                    {project.images.length > 0 ? (
                                        <Image
                                            src={project.images[0]}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-3xl opacity-50">🚀</span>
                                        </div>
                                    )}

                                    {/* Checkbox */}
                                    <div className="absolute top-2 left-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedProjects.includes(project.id)}
                                            onChange={() => toggleProject(project.id)}
                                            className="w-5 h-5 rounded border-2 border-foreground/20 bg-background/50 backdrop-blur-sm cursor-pointer"
                                        />
                                    </div>

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-2 right-2">
                                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Featured</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-3">
                                    <div>
                                        <h3 className="font-medium line-clamp-2 text-sm">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-foreground/60 mt-1 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs bg-foreground/10 px-2 py-0.5 rounded"
                                            >
                        {tech}
                      </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-xs text-foreground/50">
                        +{project.technologies.length - 3}
                      </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2">
                                        <Link
                                            href={`/${adminKey}/projects/edit/${project.id}`}
                                            className="flex-1 bg-foreground/10 hover:bg-foreground/20 px-3 py-1.5 rounded text-xs font-medium text-center transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/projects/${project.id}`}
                                            target="_blank"
                                            className="flex-1 border border-foreground/20 hover:border-foreground/40 px-3 py-1.5 rounded text-xs font-medium text-center transition-colors"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="mt-8">
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.pages}
                                baseUrl={`/${adminKey}/projects`}
                            />
                        </div>
                    )}

                    {/* Select All */}
                    <div className="flex justify-center">
                        <button
                            onClick={toggleAll}
                            className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                        >
                            {selectedProjects.length === projects.length ? 'Deselect All' : 'Select All'}
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                    <p className="text-foreground/60 mb-6">
                        Create your first project to get started.
                    </p>
                    <Link
                        href={`/${adminKey}/projects/create`}
                        className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        Create Your First Project
                    </Link>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background border border-foreground/20 rounded-lg p-6 max-w-md mx-4">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p className="text-foreground/70 mb-6">
                            Are you sure you want to delete {selectedProjects.length} project{selectedProjects.length > 1 ? 's' : ''}? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 border border-foreground/20 px-4 py-2 rounded-lg hover:border-foreground/40 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function AdminProjectsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce">🚀</div>
                    <p className="text-foreground/60">Loading projects...</p>
                </div>
            </div>
        }>
            <AdminProjectsContent />
        </Suspense>
    )
}