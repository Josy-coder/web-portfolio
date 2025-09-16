'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { createProject } from '@/lib/api'
import { Project } from '@/types'

export default function CreateProjectPage() {
    const params = useParams()
    const router = useRouter()
    const adminKey = params.adminkey as string

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        demoUrl: '',
        githubUrl: '',
        images: '',
        goal: '',
        challenges: '',
        lessons: '',
        solutions: '',
        featured: false
    })

    const createMutation = useMutation({
        mutationFn: (data: Partial<Project>) => createProject(data, adminKey),
        onSuccess: () => {
            router.push(`/${adminKey}/projects`)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const projectData = {
            ...formData,
            technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
            images: formData.images.split(',').map(img => img.trim()).filter(Boolean)
        }

        createMutation.mutate(projectData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Create New Project</h1>
                <p className="text-foreground/60 mt-1">Fill in the details to create a new project</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Project Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                        placeholder="Enter project title..."
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                        placeholder="Brief description of your project..."
                    />
                </div>

                {/* Technologies */}
                <div>
                    <label htmlFor="technologies" className="block text-sm font-medium mb-2">
                        Technologies Used *
                    </label>
                    <input
                        type="text"
                        id="technologies"
                        name="technologies"
                        required
                        value={formData.technologies}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                        placeholder="React, Next.js, TypeScript, Tailwind CSS"
                    />
                    <p className="text-xs text-foreground/50 mt-1">Separate technologies with commas</p>
                </div>

                {/* URLs */}
                <div className="grid md:grid-cols-2 gap-4">
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
                            className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="https://demo.example.com"
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
                            className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="https://github.com/username/repo"
                        />
                    </div>
                </div>

                {/* Images */}
                <div>
                    <label htmlFor="images" className="block text-sm font-medium mb-2">
                        Project Images
                    </label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                    <p className="text-xs text-foreground/50 mt-1">Separate image URLs with commas</p>
                </div>

                {/* Goal */}
                <div>
                    <label htmlFor="goal" className="block text-sm font-medium mb-2">
                        Project Goal
                    </label>
                    <textarea
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                        placeholder="What were you aiming to achieve with this project?"
                    />
                </div>

                {/* Challenges */}
                <div>
                    <label htmlFor="challenges" className="block text-sm font-medium mb-2">
                        Challenges Faced
                    </label>
                    <textarea
                        id="challenges"
                        name="challenges"
                        value={formData.challenges}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                        placeholder="What challenges did you encounter during development?"
                    />
                </div>

                {/* Solutions */}
                <div>
                    <label htmlFor="solutions" className="block text-sm font-medium mb-2">
                        How You Overcame Them
                    </label>
                    <textarea
                        id="solutions"
                        name="solutions"
                        value={formData.solutions}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                        placeholder="How did you solve the challenges you faced?"
                    />
                </div>

                {/* Lessons Learned */}
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
                        className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                        placeholder="What did you learn from this project?"
                    />
                </div>

                {/* Featured Checkbox */}
                <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-2 border-foreground/20 cursor-pointer"
                        />
                        <span className="text-sm">Featured Project</span>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 border border-foreground/20 px-6 py-3 rounded-lg hover:border-foreground/40 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={createMutation.isPending}
                        className="flex-1 bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium disabled:opacity-50"
                    >
                        {createMutation.isPending ? 'Creating...' : 'Create Project'}
                    </button>
                </div>

                {createMutation.isError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
                        Failed to create project. Please try again.
                    </div>
                )}
            </form>
        </div>
    )
}