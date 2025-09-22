'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchCareers, updateCareer } from '@/lib/api'
import { Career } from '@/types'

export default function EditCareerPage() {
    const params = useParams()
    const router = useRouter()
    const adminKey = params.adminkey as string
    const careerId = params.id as string

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

    const { data: careers, isLoading } = useQuery({
        queryKey: ['careers'],
        queryFn: fetchCareers
    })

    const career = careers?.find(c => c.id === careerId)

    const updateMutation = useMutation({
        mutationFn: (data: Partial<Career>) => updateCareer(careerId, data, adminKey),
        onSuccess: () => {
            router.push(`/${adminKey}/careers`)
        }
    })

    useEffect(() => {
        if (career) {
            setFormData({
                title: career.title || '',
                company: career.company || '',
                location: career.location || '',
                startDate: career.startDate ? new Date(career.startDate).toISOString().split('T')[0] : '',
                endDate: career.endDate ? new Date(career.endDate).toISOString().split('T')[0] : '',
                current: career.current || false,
                description: career.description || '',
                achievements: career.achievements ? career.achievements.join('\n') : '',
                technologies: career.technologies ? career.technologies.join(', ') : '',
                order: career.order || 0
            })
        }
    }, [career])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const careerData = {
            ...formData,
            achievements: formData.achievements.split('\n').map(item => item.trim()).filter(Boolean),
            technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
            startDate: formData.startDate,
            endDate: formData.endDate || null,
            order: parseInt(formData.order.toString()) || 0
        }

        updateMutation.mutate(careerData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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

    if (!career) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <div className="text-6xl mb-4">❓</div>
                <h2 className="text-xl font-semibold mb-2">Career Entry Not Found</h2>
                <p className="text-foreground/60 mb-6">
                    The career entry you're looking for doesn't exist.
                </p>
                <button
                    onClick={() => router.push(`/${adminKey}/careers`)}
                    className="bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                >
                    Back to Careers
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Edit Career Entry</h1>
                <p className="text-foreground/60">
                    Update your professional career information.
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
                        disabled={updateMutation.isPending}
                        className="flex-1 bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium disabled:opacity-50"
                    >
                        {updateMutation.isPending ? 'Updating...' : 'Update Career Entry'}
                    </button>
                </div>

                {updateMutation.error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-500 text-sm">
                            Error updating career entry. Please try again.
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}