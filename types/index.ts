export interface Blog {
    id: string
    title: string
    content: string
    excerpt?: string | null
    slug: string
    published: boolean
    featured: boolean
    featuredImage?: string | null
    tags: string[]
    createdAt: Date
    updatedAt: Date
}

export interface BlogCard {
    id: string
    title: string
    excerpt?: string | null
    slug: string
    featuredImage?: string | null
    tags: string[]
    createdAt: Date
}

export interface Project {
    id: string
    title: string
    description: string
    technologies: string[]
    demoUrl?: string | null
    githubUrl?: string | null
    images: string[]
    goal?: string | null
    challenges?: string | null
    lessons?: string | null
    solutions?: string | null
    featured: boolean
    createdAt: Date
    updatedAt: Date
}

export interface ProjectCard {
    id: string
    title: string
    description: string
    technologies: string[]
    demoUrl?: string | null
    githubUrl?: string | null
    images: string[]
}

export interface Career {
    id: string
    title: string
    company: string
    location?: string | null
    startDate: Date
    endDate?: Date | null
    current: boolean
    description?: string | null
    achievements: string[]
    technologies: string[]
    order: number
    createdAt: Date
    updatedAt: Date
}

export interface CreateCareerData {
    title: string
    company: string
    location?: string
    startDate: string
    endDate?: string | null
    current: boolean
    description?: string
    achievements: string[]
    technologies: string[]
    order: number
}

export interface UpdateCareerData {
    title?: string
    company?: string
    location?: string
    startDate?: string
    endDate?: string | null
    current?: boolean
    description?: string
    achievements?: string[]
    technologies?: string[]
    order?: number
}