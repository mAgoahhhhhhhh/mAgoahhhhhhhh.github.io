"use client"

import { useCallback, useState } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  previewUrl: string | null
  onClear: () => void
  isAnalyzing: boolean
}

export function UploadZone({ onFileSelect, previewUrl, onClear, isAnalyzing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file)
      }
    },
    [onFileSelect]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        onFileSelect(file)
      }
    },
    [onFileSelect]
  )

  if (previewUrl) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative aspect-[4/3] w-full">
          <img
            src={previewUrl}
            alt="Uploaded blood slide"
            className="h-full w-full object-cover"
          />
          {!isAnalyzing && (
            <button
              onClick={onClear}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-background transition-colors hover:bg-foreground"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 border-t border-border px-4 py-3">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Blood slide image uploaded</span>
        </div>
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Upload className="h-6 w-6 text-primary" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-base font-semibold text-foreground">
          Drop your blood slide image here
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse from your device
        </p>
      </div>
      <Button variant="outline" className="mt-6" asChild>
        <label className="cursor-pointer">
          Browse Files
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="sr-only"
            aria-label="Upload blood slide image"
          />
        </label>
      </Button>
      <p className="mt-4 text-xs text-muted-foreground">
        Supports JPG, PNG, TIFF up to 25MB
      </p>
    </div>
  )
}
