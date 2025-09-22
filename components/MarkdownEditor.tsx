'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ImageUpload from './ImageUpload'

const MDEditor = dynamic(
    () => import('@uiw/react-md-editor').then((mod) => mod.default),
    { ssr: false }
)

interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    height?: number
    className?: string
}

export default function MarkdownEditor({
    value,
    onChange,
    placeholder = "Start writing your content...",
    height = 400,
    className = ""
}: MarkdownEditorProps) {
    const [showImageUpload, setShowImageUpload] = useState(false)

    const handleImageUpload = (url: string | null) => {
        if (url) {
            // Insert the uploaded image into the markdown content
            const imageMarkdown = `\n![Image](${url})\n`
            const newValue = value + imageMarkdown
            onChange(newValue)
        }
        setShowImageUpload(false)
    }

    // Custom toolbar with image upload button
    const customCommands = [
        {
            name: 'image-upload',
            keyCommand: 'image-upload',
            buttonProps: { 'aria-label': 'Upload image', title: 'Upload image' },
            icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
            ),
            execute: () => {
                setShowImageUpload(true)
            }
        }
    ]

    return (
        <div className={`markdown-editor ${className}`}>
            <MDEditor
                value={value}
                onChange={(val) => onChange(val || '')}
                height={height}
                preview="edit"
                hideToolbar={false}
                visibleDragbar={false}
                textareaProps={{
                    placeholder,
                    style: {
                        fontSize: 14,
                        lineHeight: 1.5,
                        fontFamily: 'inherit',
                    }
                }}
                extraCommands={customCommands}
                data-color-mode="light"
            />

            {/* Image Upload Modal */}
            {showImageUpload && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background border border-foreground/20 rounded-lg p-6 max-w-md mx-4 w-full">
                        <h3 className="text-xl font-semibold mb-4">Upload Image</h3>

                        <ImageUpload
                            onImageChange={handleImageUpload}
                            placeholder="Upload an image for your content"
                            className="mb-4"
                        />

                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowImageUpload(false)}
                                className="px-4 py-2 border border-foreground/20 rounded-lg hover:border-foreground/40 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-2 text-xs text-foreground/60">
                <div className="flex flex-wrap gap-4">
                    <span>💡 <strong>Tip:</strong> Use the image button above to upload images</span>
                    <span>📝 Supports full Markdown syntax</span>
                    <span>🎨 Use HTML for advanced styling</span>
                </div>
                <div className="mt-1">
                    <span>✨ <strong>Quick shortcuts:</strong> **bold**, *italic*, `code`, # heading, - list</span>
                </div>
            </div>
        </div>
    )
}