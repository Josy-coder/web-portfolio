'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { uploadImage, deleteImage } from '@/lib/api'

interface ImageUploadProps {
    currentImage?: string
    currentImages?: string[]
    onImageChange?: (url: string | null) => void
    onImagesChange?: (urls: string[]) => void
    placeholder?: string
    className?: string
    multiple?: boolean
    maxImages?: number
}

export default function ImageUpload({
    currentImage,
    currentImages = [],
    onImageChange,
    onImagesChange,
    placeholder = "Click to upload an image",
    className = "",
    multiple = false,
    maxImages = 5
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dragOver, setDragOver] = useState(false)

    const uploadMutation = useMutation({
        mutationFn: ({ file, oldUrl }: { file: File; oldUrl?: string }) =>
            uploadImage(file, oldUrl),
        onSuccess: (data) => {
            if (multiple && onImagesChange) {
                onImagesChange([...currentImages, data.url])
            } else if (onImageChange) {
                onImageChange(data.url)
            }
        },
        onError: () => {
            alert('Failed to upload image. Please try again.')
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteImage,
        onSuccess: (_, deletedUrl) => {
            if (multiple && onImagesChange) {
                onImagesChange(currentImages.filter(img => img !== deletedUrl))
            } else if (onImageChange) {
                onImageChange(null)
            }
        },
        onError: () => {
            alert('Failed to delete image')
        }
    })

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        if (multiple && currentImages.length >= maxImages) {
            alert(`Maximum ${maxImages} images allowed`)
            return
        }

        uploadMutation.mutate({ file, oldUrl: multiple ? undefined : currentImage })
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        setDragOver(false)

        const file = event.dataTransfer.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault()
        setDragOver(true)
    }

    const handleDragLeave = () => {
        setDragOver(false)
    }

    const handleRemoveImage = (imageUrl?: string) => {
        if (multiple && imageUrl) {
            deleteMutation.mutate(imageUrl)
        } else if (currentImage) {
            deleteMutation.mutate(currentImage)
        } else if (onImageChange) {
            onImageChange(null)
        }
    }

    const isLoading = uploadMutation.isPending || deleteMutation.isPending

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Multiple Images Grid */}
            {multiple && currentImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentImages.map((imageUrl, index) => (
                        <div key={imageUrl} className="relative group">
                            <div className="relative h-32 bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10">
                                <Image
                                    src={imageUrl}
                                    alt={`Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(imageUrl)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Area */}
            {(!multiple || currentImages.length < maxImages) && (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                        relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all
                        ${dragOver ? 'border-blue-400 bg-blue-50/50' : 'border-foreground/20 hover:border-foreground/40'}
                        ${isLoading ? 'pointer-events-none opacity-60' : ''}
                    `}
                >
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                            <div className="text-center">
                                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                                <p className="text-sm text-foreground/60">
                                    {uploadMutation.isPending ? 'Uploading...' : 'Deleting...'}
                                </p>
                            </div>
                        </div>
                    )}

                    {!multiple && currentImage ? (
                        <div className="space-y-4">
                            <div className="relative h-48 bg-foreground/5 rounded-lg overflow-hidden">
                                <Image
                                    src={currentImage}
                                    alt="Uploaded image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        fileInputRef.current?.click()
                                    }}
                                    className="flex-1 bg-foreground/10 hover:bg-foreground/20 px-4 py-2 rounded-lg transition-colors font-medium"
                                >
                                    Change Image
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemoveImage()
                                    }}
                                    className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">📸</div>
                            <p className="text-foreground/60 mb-2">{placeholder}</p>
                            <p className="text-sm text-foreground/40">
                                Drag and drop or click to browse
                            </p>
                            <p className="text-xs text-foreground/30 mt-2">
                                {multiple
                                    ? `${currentImages.length} of ${maxImages} images uploaded`
                                    : 'Supports: JPG, PNG, GIF, WebP'
                                }
                            </p>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            )}

            {multiple && currentImages.length >= maxImages && (
                <div className="text-center py-4 bg-foreground/5 rounded-lg border border-foreground/10">
                    <p className="text-sm text-foreground/60">
                        Maximum {maxImages} images reached. Remove an image to upload more.
                    </p>
                </div>
            )}
        </div>
    )
}