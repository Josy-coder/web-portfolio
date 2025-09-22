'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { createCareer } from '@/lib/api'
import { Career } from '@/types'

export default function CreateCareerPage() {
    const params = useParams()
    const router = useRouter()
    const adminKey = params.adminkey as string

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: '',
        technologies: '',
        order: 0
    })

    const createMutation = useMutation({
        mutationFn: (data: Partial<Career>) => createCareer(data, adminKey),
        onSuccess: () => {
            router.push(`/${adminKey}/careers`)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const careerData = {
            ...formData,
            achievements: formData.achievements.split('\n').map(item => item.trim()).filter(Boolean),
            technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
            startDate: new Date(formData.startDate).toISOString(),
            endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
        }

        createMutation.mutate(careerData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Add Career Entry</h1>
                <p className="text-foreground/60">
                    Add a new entry to your professional career history.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Basic Information</h2>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Job Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="e.g., Senior Frontend Developer"
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                            Company *
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="e.g., Tech Company Inc."
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="e.g., San Francisco, CA"
                        />
                    </div>
                </div>

                {/* Employment Period */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Employment Period</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium mb-2">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium mb-2">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                disabled={formData.current}
                                className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="current"
                            name="current"
                            checked={formData.current}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-foreground/20"
                        />
                        <label htmlFor="current" className="text-sm">
                            This is my current position
                        </label>
                    </div>
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Job Details</h2>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                            Job Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-vertical"
                            placeholder="Describe your role and responsibilities..."
                        />
                    </div>

                    <div>
                        <label htmlFor="achievements" className="block text-sm font-medium mb-2">
                            Key Achievements
                        </label>
                        <textarea
                            id="achievements"
                            name="achievements"
                            value={formData.achievements}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors resize-vertical"
                            placeholder="List your key achievements (one per line)..."
                        />
                        <p className="text-xs text-foreground/60 mt-1">
                            Enter each achievement on a new line
                        </p>
                    </div>

                    <div>
                        <label htmlFor="technologies" className="block text-sm font-medium mb-2">
                            Technologies Used
                        </label>
                        <input
                            type="text"
                            id="technologies"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="e.g., React, TypeScript, Node.js"
                        />
                        <p className="text-xs text-foreground/60 mt-1">
                            Separate technologies with commas
                        </p>
                    </div>
                </div>

                {/* Display Settings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Display Settings</h2>

                    <div>
                        <label htmlFor="order" className="block text-sm font-medium mb-2">
                            Display Order
                        </label>
                        <input
                            type="number"
                            id="order"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors"
                            placeholder="0"
                        />
                        <p className="text-xs text-foreground/60 mt-1">
                            Lower numbers appear first. Most recent jobs typically have higher numbers.
                        </p>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => router.push(`/${adminKey}/careers`)}
                        className="flex-1 border border-foreground/20 px-6 py-3 rounded-lg hover:border-foreground/40 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={createMutation.isPending}
                        className="flex-1 bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium disabled:opacity-50"
                    >
                        {createMutation.isPending ? 'Creating...' : 'Create Career Entry'}
                    </button>
                </div>

                {createMutation.error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-500 text-sm">
                            Error creating career entry. Please try again.
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}