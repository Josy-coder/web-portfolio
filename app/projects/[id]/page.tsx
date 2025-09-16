'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { fetchProjectById } from '@/lib/api'

export default function ProjectDetail() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const [selectedImage, setSelectedImage] = useState(0)

    const { data: project, isLoading, error } = useQuery({
        queryKey: ['project', id],
        queryFn: () => fetchProjectById(id)
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">🚀</div>
                    <p className="text-foreground/60">Loading project...</p>
                </div>
            </div>
        )
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-semibold">Project Not Found</h2>
                    <p className="text-foreground/60">The project you&#39;re looking for doesn&#39;t exist.</p>
                    <Link
                        href="/projects"
                        className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                        Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-foreground/60 hover:text-foreground hover:cursor-pointer transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div className="space-y-6">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                                {project.title}
                            </h1>
                            {project.featured && (
                                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  Featured
                </span>
                            )}
                        </div>

                        <p className="text-xl text-foreground/70 leading-relaxed">
                            {project.description}
                        </p>

                        <div>
                            <h3 className="text-sm font-medium text-foreground/70 mb-3">Tech Stack:</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="bg-foreground/10 px-3 py-1 rounded-lg text-sm"
                                    >
                    {tech}
                  </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Live Demo
                                </a>
                            )}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 border border-foreground/20 px-6 py-3 rounded-lg hover:border-foreground/40 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    View Code
                                </a>
                            )}
                        </div>
                    </div>

                    {project.images.length > 0 && (
                        <div className="mt-12 space-y-4">
                            <div className="aspect-video relative rounded-lg overflow-hidden bg-foreground/5">
                                <Image
                                    src={project.images[selectedImage]}
                                    alt={`${project.title} - Image ${selectedImage + 1}`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {project.images.length > 1 && (
                                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                    {project.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-video relative rounded-lg overflow-hidden transition-all ${
                                                selectedImage === index
                                                    ? 'ring-2 ring-blue-500 scale-105'
                                                    : 'opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        {project.goal && (
                            <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    Project Goal
                                </h2>
                                <p className="text-foreground/80 leading-relaxed">
                                    {project.goal}
                                </p>
                            </div>
                        )}

                        {project.challenges && (
                            <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    Challenges Faced
                                </h2>
                                <p className="text-foreground/80 leading-relaxed">
                                    {project.challenges}
                                </p>
                            </div>
                        )}

                        {project.solutions && (
                            <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    How I Overcame Them
                                </h2>
                                <p className="text-foreground/80 leading-relaxed">
                                    {project.solutions}
                                </p>
                            </div>
                        )}

                        {project.lessons && (
                            <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    Lessons Learned
                                </h2>
                                <p className="text-foreground/80 leading-relaxed">
                                    {project.lessons}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-12 space-y-4 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold">Interested in This Project?</h2>
                        <p className="text-foreground/70">
                            I&#39;d love to discuss the technical details or collaborate on something similar.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="mailto:baho.charite@gmail.com"
                                className="bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                            >
                                Get in Touch
                            </a>
                            <Link
                                href="/projects"
                                className="border border-foreground/20 px-6 py-3 rounded-lg hover:border-foreground/40 transition-colors font-medium"
                            >
                                View More Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}