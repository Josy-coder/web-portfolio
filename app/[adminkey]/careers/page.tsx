'use client'

import { useState, Suspense } from 'react'
import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Career } from '../../../types'
import { fetchCareers, deleteCareer } from '../../../lib/api'

function AdminCareersContent() {
    const params = useParams()
    const queryClient = useQueryClient()

    const adminKey = params.adminkey as string

    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const { data: careers, isLoading } = useQuery({
        queryKey: ['admin-careers'],
        queryFn: fetchCareers
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteCareer(id, adminKey),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-careers'] })
            setSelectedCareer(null)
            setShowDeleteConfirm(false)
        }
    })

    const handleDelete = () => {
        if (selectedCareer) {
            deleteMutation.mutate(selectedCareer.id)
        }
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce">💼</div>
                    <p className="text-foreground/60">Loading careers...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Manage Career History</h1>
                    <p className="text-foreground/60 mt-1">{careers?.length || 0} career entries</p>
                </div>
                <Link
                    href={`/${adminKey}/careers/create`}
                    className="bg-foreground text-background px-6 py-2 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                >
                    + Add Career Entry
                </Link>
            </div>

            {/* Careers List */}
            {careers && careers.length > 0 ? (
                <div className="space-y-4">
                    {careers.map((career: Career) => (
                        <div
                            key={career.id}
                            className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6 hover:border-foreground/20 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold">{career.title}</h3>
                                        {career.current && (
                                            <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded">
                                                Current
                                            </span>
                                        )}
                                    </div>

                                    <div className="text-foreground/80 mb-2">
                                        <span className="font-medium">{career.company}</span>
                                        {career.location && <span className="text-foreground/60"> • {career.location}</span>}
                                    </div>

                                    <div className="text-sm text-foreground/60 mb-3">
                                        {formatDate(career.startDate)} - {career.endDate ? formatDate(career.endDate) : 'Present'}
                                    </div>

                                    {career.description && (
                                        <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                                            {career.description}
                                        </p>
                                    )}

                                    {career.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {career.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs bg-foreground/10 px-2 py-1 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {career.achievements.length > 0 && (
                                        <div className="text-sm text-foreground/60">
                                            <strong>Key Achievements:</strong> {career.achievements.length} listed
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    <span className="text-xs text-foreground/50 bg-foreground/5 px-2 py-1 rounded">
                                        Order: {career.order}
                                    </span>
                                    <Link
                                        href={`/${adminKey}/careers/edit/${career.id}`}
                                        className="bg-foreground/10 hover:bg-foreground/20 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSelectedCareer(career)
                                            setShowDeleteConfirm(true)
                                        }}
                                        className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">💼</div>
                    <h3 className="text-xl font-semibold mb-2">No Career Entries Yet</h3>
                    <p className="text-foreground/60 mb-6">
                        Add your first career entry to showcase your professional journey.
                    </p>
                    <Link
                        href={`/${adminKey}/careers/create`}
                        className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        Add Your First Career Entry
                    </Link>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && selectedCareer && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background border border-foreground/20 rounded-lg p-6 max-w-md mx-4">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p className="text-foreground/70 mb-6">
                            Are you sure you want to delete the career entry for <strong>{selectedCareer.title}</strong> at <strong>{selectedCareer.company}</strong>? This action cannot be undone.
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

export default function AdminCareersPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce">💼</div>
                    <p className="text-foreground/60">Loading careers...</p>
                </div>
            </div>
        }>
            <AdminCareersContent />
        </Suspense>
    )
}