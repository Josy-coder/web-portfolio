'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { fetchFeaturedBlogs, fetchFeaturedProjects } from '@/lib/api'
import { BlogCard, ProjectCard } from '@/types'

const quotes = [
    "Sometimes, all you need is a fresh start.",
    "The best way to predict the future is to fix what's in front of you.",
    "Every problem is an opportunity in disguise.",
    "Success is the result of trial, error, and persistence.",
    "Don't wait for the storm to pass—learn to dance in the rain.",
    "Perfection is a moving target, aim for progress instead.",
    "If things don’t work, don’t give up—just find a new way.",
    "You can’t control everything, but you can control how you respond.",
    "Setbacks are just setups for a comeback.",
    "You can't improve what you don’t try to change.",
    "A goal without a plan is just a wish.",
    "It's not about how many times you fall; it's about how many times you get up.",
    "The road to success is always under construction.",
    "Learn to adapt or be left behind.",
    "The only limit is the one you set for yourself.",
    "Opportunities don’t happen; you create them.",
    "Focus on progress, not perfection.",
    "Small steps lead to big changes.",
    "Don’t be afraid to take risks—sometimes the best things happen when you step outside your comfort zone.",
    "The harder you work, the luckier you get.",
    "Good things take time, but great things take even longer.",
    "Your only competition is the person you were yesterday.",
    "Every step forward, no matter how small, brings you closer to your goal.",
    "You are the architect of your own success.",
    "Success isn’t final, failure isn’t fatal—it's the courage to continue that counts.",
    "Start where you are. Use what you have. Do what you can.",
    "Great things never come from comfort zones.",
    "When one door closes, another one opens.",
    "Don’t count the days, make the days count.",
    "It's not the strongest that survive, but the most adaptable.",
    "Hard work beats talent when talent doesn’t work hard.",
    "The only way to do great work is to love what you do."
];


export default function HomePage() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    const { data: blogsData } = useQuery({
        queryKey: ['featured-blogs'],
        queryFn: () => fetchFeaturedBlogs(2)
    })

    const { data: projectsData } = useQuery({
        queryKey: ['featured-projects'],
        queryFn: () => fetchFeaturedProjects(2)
    })

    const featuredBlogs = blogsData?.blogs || []
    const featuredProjects = projectsData?.projects || []

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12 min-h-[calc(100vh-8rem)] items-center">

                    {/* Left Side - Introduction & Quote */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                Hi, I&#39;m{' '}
                                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Developer
                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed">
                                I&#39;m a passionate full-stack developer who loves building meaningful digital experiences.
                                I specialize in modern web technologies and enjoy solving complex problems through clean,
                                efficient code.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/projects"
                                    className="bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                                >
                                    View My Work
                                </Link>
                                <Link
                                    href="/about"
                                    className="border border-foreground/20 px-6 py-3 rounded-lg hover:border-foreground/40 transition-colors font-medium"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-6">
                            <p className="text-foreground/70 italic">
                                &#34;{randomQuote}&#34;
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">Latest Thoughts</h2>
                                <Link
                                    href="/blog"
                                    className="text-foreground/60 hover:text-foreground hover:cursor-pointer transition-colors text-sm"
                                >
                                    View all →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {featuredBlogs.length > 0 ? (
                                    featuredBlogs.map((blog: BlogCard) => (
                                        <Link
                                            key={blog.id}
                                            href={`/blog/${blog.slug}`}
                                            className="block bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4 hover:border-foreground/20 transition-all group"
                                        >
                                            <div className="flex gap-4">
                                                {blog.featuredImage ? (
                                                    <div className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden bg-foreground/10">
                                                        <Image
                                                            src={blog.featuredImage}
                                                            alt={blog.title}
                                                            width={80}
                                                            height={64}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex-shrink-0 w-20 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                                                        <span className="text-2xl">📝</span>
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium group-hover:text-foreground/80 transition-colors line-clamp-1">
                                                        {blog.title}
                                                    </h3>
                                                    {blog.excerpt && (
                                                        <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
                                                            {blog.excerpt}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-foreground/50 text-sm">No featured blogs yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">Featured Work</h2>
                                <Link
                                    href="/projects"
                                    className="text-foreground/60 hover:text-foreground hover:cursor-pointer transition-colors text-sm"
                                >
                                    View all →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {featuredProjects.length > 0 ? (
                                    featuredProjects.map((project: ProjectCard) => (
                                        <Link
                                            key={project.id}
                                            href={`/projects/${project.id}`}
                                            className="block bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg p-4 hover:border-foreground/20 transition-all group"
                                        >
                                            <h3 className="font-medium group-hover:text-foreground/80 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="mt-3">
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
                                                </div>
                                            </div>
                                            <div className="flex gap-3 mt-3">
                                                {project.demoUrl && (
                                                    <span className="text-xs text-blue-500">Demo</span>
                                                )}
                                                {project.githubUrl && (
                                                    <span className="text-xs text-foreground/60">GitHub</span>
                                                )}
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-foreground/50 text-sm">No featured projects yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}