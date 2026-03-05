"use client"

import { UploadZone } from "@/components/upload-zone"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Microscope, RotateCcw, User } from "lucide-react"

interface PatientInputSectionProps {
  patientName: string
  onPatientNameChange: (name: string) => void
  previewUrl: string | null
  onFileSelect: (file: File) => void
  onClear: () => void
  onAnalyze: () => void
  isAnalyzing: boolean
  hasResult: boolean
}

export function PatientInputSection({
  patientName,
  onPatientNameChange,
  previewUrl,
  onFileSelect,
  onClear,
  onAnalyze,
  isAnalyzing,
  hasResult,
}: PatientInputSectionProps) {
  const canAnalyze = patientName.trim().length > 0 && previewUrl && !isAnalyzing && !hasResult

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Patient Information
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Enter patient details and upload a blood slide image for analysis.
        </p>
      </div>

      {/* Patient Name Input */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="patient-name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Patient Name
            </Label>
            <Input
              id="patient-name"
              type="text"
              placeholder="Enter patient full name"
              value={patientName}
              onChange={(e) => onPatientNameChange(e.target.value)}
              disabled={isAnalyzing || hasResult}
              className="h-11"
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <UploadZone
        onFileSelect={onFileSelect}
        previewUrl={previewUrl}
        onClear={onClear}
        isAnalyzing={isAnalyzing}
      />

      {/* Analyze Button */}
      {canAnalyze && (
        <Button onClick={onAnalyze} size="lg" className="w-full h-12 text-base">
          <Microscope className="h-5 w-5" />
          Analyze Blood Slide
        </Button>
      )}

      {/* Reset Button */}
      {hasResult && (
        <Button onClick={onClear} variant="outline" size="lg" className="w-full h-12 text-base">
          <RotateCcw className="h-5 w-5" />
          Analyze Another Slide
        </Button>
      )}

      {/* Validation messages */}
      {!patientName.trim() && previewUrl && !isAnalyzing && !hasResult && (
        <p className="text-xs text-muted-foreground text-center">
          Please enter the patient name to proceed with analysis
        </p>
      )}

      {/* Disclaimer */}
      <div className="rounded-lg border border-border bg-secondary/50 px-4 py-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Disclaimer:</span>{" "}
          This tool is for educational and screening purposes only. Results should not
          be used as a medical diagnosis. Always consult a qualified healthcare
          professional for medical advice.
        </p>
      </div>
    </div>
  )
}
