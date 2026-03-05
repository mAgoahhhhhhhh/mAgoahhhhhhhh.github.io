"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

const steps = [
  "Scanning blood slide image...",
  "Identifying cell structures...",
  "Counting blood components...",
  "Running disease detection models...",
  "Generating analysis report...",
]

export function AnalyzingSkeleton() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 py-16">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">Analyzing Blood Slide</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Please wait while we process your image
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        {steps.map((step, i) => (
          <div
            key={step}
            className={`flex items-center gap-2 text-sm transition-all duration-300 ${
              i < currentStep
                ? "text-success"
                : i === currentStep
                ? "text-foreground font-medium"
                : "text-muted-foreground/40"
            }`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                i < currentStep
                  ? "bg-success"
                  : i === currentStep
                  ? "bg-primary animate-pulse"
                  : "bg-muted-foreground/30"
              }`}
            />
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}
