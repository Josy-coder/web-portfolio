import { Blog, Project, Career, CreateCareerData, UpdateCareerData } from '@/types'

export interface BlogsResponse {
    blogs: Blog[]
    pagination: {
        page: number
        limit: number
        total: number
        pages: number
    }
}

export interface ProjectsResponse {
    projects: Project[]
    pagination: {
        page: number
        limit: number
        total: number
        pages: number
    }
}

export async function fetchBlogs(page: number = 1, limit: number = 9): Promise<BlogsResponse> {
    const response = await fetch(`/api/blogs?page=${page}&limit=${limit}`)

    if (!response.ok) {
        throw new Error('Failed to fetch blogs')
    }

    return response.json()
}

export async function fetchFeaturedBlogs(limit: number = 2): Promise<BlogsResponse> {
    const response = await fetch(`/api/blogs?featured=true&limit=${limit}`)

    if (!response.ok) {
        throw new Error('Failed to fetch featured blogs')
    }

    return response.json()
}

export async function fetchBlogBySlug(slug: string): Promise<Blog> {
    const response = await fetch(`/api/blogs/${slug}`)

    if (!response.ok) {
        throw new Error('Failed to fetch blog')
    }

    return response.json()
}

export async function createBlog(data: Partial<Blog>, adminKey: string): Promise<Blog> {
    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Failed to create blog')
    }

    return response.json()
}

export async function updateBlog(slug: string, data: Partial<Blog>, adminKey: string): Promise<Blog> {
    const response = await fetch(`/api/blogs/${slug}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Failed to update blog')
    }

    return response.json()
}

export async function deleteBlog(slug: string, adminKey: string): Promise<void> {
    const response = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
        headers: {
            'x-admin-key': adminKey
        }
    })

    if (!response.ok) {
        throw new Error('Failed to delete blog')
    }
}

export async function deleteBlogs(ids: string[], adminKey: string): Promise<{ success: boolean; deleted: number }> {
    const response = await fetch(`/api/blogs`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        },
        body: JSON.stringify({ ids })
    })

    if (!response.ok) {
        throw new Error('Failed to delete blogs')
    }

    return response.json()
}

export async function fetchProjects(page: number = 1, limit: number = 9): Promise<ProjectsResponse> {
    const response = await fetch(`/api/projects?page=${page}&limit=${limit}`)

    if (!response.ok) {
        throw new Error('Failed to fetch projects')
    }

    return response.json()
}

export async function fetchFeaturedProjects(limit: number = 2): Promise<ProjectsResponse> {
    const response = await fetch(`/api/projects?featured=true&limit=${limit}`)

    if (!response.ok) {
        throw new Error('Failed to fetch featured projects')
    }

    return response.json()
}

export async function fetchProjectById(id: string): Promise<Project> {
    const response = await fetch(`/api/projects/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch project')
    }

    return response.json()
}

export async function createProject(data: Partial<Project>, adminKey: string): Promise<Project> {
    const response = await fetch(`/api/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Failed to create project')
    }

    return response.json()
}

export async function updateProject(id: string, data: Partial<Project>, adminKey: string): Promise<Project> {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Failed to update project')
    }

    return response.json()
}

export async function deleteProject(id: string, adminKey: string): Promise<void> {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'x-admin-key': adminKey
        }
    })

    if (!response.ok) {
        throw new Error('Failed to delete project')
    }
}

export async function deleteProjects(ids: string[], adminKey: string): Promise<{ success: boolean; deleted: number }> {
    const response = await fetch(`/api/projects`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        },
        body: JSON.stringify({ ids })
    })

    if (!response.ok) {
        throw new Error('Failed to delete projects')
    }

    return response.json()
}

// Image Upload Functions
export interface UploadResponse {
    url: string
}

export async function uploadImage(file: File, oldUrl?: string): Promise<UploadResponse> {
    const filename = `${Date.now()}-${file.name}`
    const url = `/api/upload?filename=${encodeURIComponent(filename)}${oldUrl ? `&oldUrl=${encodeURIComponent(oldUrl)}` : ''}`

    const response = await fetch(url, {
        method: 'POST',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to upload image')
    }

    return response.json()
}

export async function deleteImage(url: string): Promise<{ success: boolean }> {
    const response = await fetch(`/api/upload?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Failed to delete image')
    }

    return response.json()
}

// Career Functions
export async function fetchCareers(): Promise<Career[]> {
    const response = await fetch(`/api/careers`)

    if (!response.ok) {
        throw new Error('Failed to fetch careers')
    }

    return response.json()
}

export async function createCareer(data: CreateCareerData, adminKey: string): Promise<Career> {
    const response = await fetch(`/api/careers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Failed to create career')
    }

    return response.json()
}

export async function updateCareer(id: string, data: UpdateCareerData, adminKey: string): Promise<Career> {
    const response = await fetch(`/api/careers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Failed to update career')
    }

    return response.json()
}

export async function deleteCareer(id: string, adminKey: string): Promise<void> {
    const response = await fetch(`/api/careers/${id}`, {
        method: 'DELETE',
        headers: {
            'x-admin-key': adminKey
        }
    })

    if (!response.ok) {
        throw new Error('Failed to delete career')
    }
}