'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchProjectById, updateProject } from '@/lib/api'
import { Project } from '@/types'
import ImageUpload from '@/components/ImageUpload'

export default function EditProjectPage() {
    const params = useParams()
    const router = useRouter()
    const adminKey = params.adminkey as string
    const projectId = params.id as string

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        demoUrl: '',
        githubUrl: '',
        images: [] as string[],
        goal: '',
        challenges: '',
        lessons: '',
        solutions: '',
        featured: false
    })

    const { data: project, isLoading } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => fetchProjectById(projectId)
    })

    const updateMutation = useMutation({
        mutationFn: (data: Partial<Project>) => updateProject(projectId, data, adminKey),
        onSuccess: () => {
            router.push(`/${adminKey}/projects`)
        }
    })

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                technologies: project.technologies ? project.technologies.join(', ') : '',
                demoUrl: project.demoUrl || '',
                githubUrl: project.githubUrl || '',
                images: project.images || [],
                goal: project.goal || '',
                challenges: project.challenges || '',
                lessons: project.lessons || '',
                solutions: project.solutions || '',
                featured: project.featured || false
            })
        }
    }, [project])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const projectData = {
            ...formData,
            technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
            images: formData.images
        }

        updateMutation.mutate(projectData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleImageUpload = (url: string) => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, url]
        }))
    }

    const handleImageRemove = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-foreground/20 rounded w-1/3"></div>
                    <div className="h-4 bg-foreground/10 rounded w-2/3"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-foreground/20 rounded"></div>
                        <div className="h-20 bg-foreground/20 rounded"></div>
                        <div className="h-10 bg-foreground/20 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
                <p className="text-foreground/60">
                    Update your project information and details.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Basic Information</h2>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Project Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-vertical"
                        />
                    </div>

                    <div>
                        <label htmlFor="technologies" className="block text-sm font-medium mb-2">
                            Technologies
                        </label>
                        <input
                            type="text"
                            id="technologies"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="React, TypeScript, Node.js"
                        />
                        <p className="text-xs text-foreground/60 mt-1">
                            Separate technologies with commas
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Links</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="demoUrl" className="block text-sm font-medium mb-2">
                                Demo URL
                            </label>
                            <input
                                type="url"
                                id="demoUrl"
                                name="demoUrl"
                                value={formData.demoUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
                                GitHub URL
                            </label>
                            <input
                                type="url"
                                id="githubUrl"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Images</h2>
                    <ImageUpload
                        onUpload={handleImageUpload}
                        images={formData.images}
                        onRemove={handleImageRemove}
                    />
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Project Details</h2>

                    <div>
                        <label htmlFor="goal" className="block text-sm font-medium mb-2">
                            Goal
                        </label>
                        <textarea
                            id="goal"
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-vertical"
                        />
                    </div>

                    <div>
                        <label htmlFor="challenges" className="block text-sm font-medium mb-2">
                            Challenges
                        </label>
                        <textarea
                            id="challenges"
                            name="challenges"
                            value={formData.challenges}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-vertical"
                        />
                    </div>

                    <div>
                        <label htmlFor="solutions" className="block text-sm font-medium mb-2">
                            Solutions
                        </label>
                        <textarea
                            id="solutions"
                            name="solutions"
                            value={formData.solutions}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-vertical"
                        />
                    </div>

                    <div>
                        <label htmlFor="lessons" className="block text-sm font-medium mb-2">
                            Lessons Learned
                        </label>
                        <textarea
                            id="lessons"
                            name="lessons"
                            value={formData.lessons}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-vertical"
                        />
                    </div>
                </div>

                {/* Settings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Settings</h2>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-foreground/20"
                        />
                        <label htmlFor="featured" className="text-sm">
                            Mark as favorite project
                        </label>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => router.push(`/${adminKey}/projects`)}
                        className="flex-1 border border-foreground/20 px-6 py-3 rounded-lg hover:border-foreground/40 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="flex-1 bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium disabled:opacity-50"
                    >
                        {updateMutation.isPending ? 'Updating...' : 'Update Project'}
                    </button>
                </div>

                {updateMutation.error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-500 text-sm">
                            Error updating project. Please try again.
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}