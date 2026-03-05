"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  CircleDot,
  ShieldAlert,
  ShieldCheck,
  Droplets,
  Microscope,
  User,
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface BloodComponent {
  name: string
  count: string
  percentage: number
  status: "normal" | "low" | "high"
  normalRange: string
}

export interface DiseaseDetection {
  name: string
  detected: boolean
  confidence: number
  description: string
}

export interface AnalysisResult {
  components: BloodComponent[]
  diseases: DiseaseDetection[]
  summary: string
}

function getStatusColor(status: "normal" | "low" | "high") {
  switch (status) {
    case "normal":
      return "bg-success text-success-foreground"
    case "low":
      return "bg-warning text-warning-foreground"
    case "high":
      return "bg-destructive text-white"
  }
}

function getStatusLabel(status: "normal" | "low" | "high") {
  switch (status) {
    case "normal":
      return "Normal"
    case "low":
      return "Below Range"
    case "high":
      return "Above Range"
  }
}

function ComponentIcon({ name }: { name: string }) {
  if (name.toLowerCase().includes("red")) {
    return <Droplets className="h-5 w-5 text-primary" />
  }
  if (name.toLowerCase().includes("white")) {
    return <ShieldCheck className="h-5 w-5 text-chart-2" />
  }
  if (name.toLowerCase().includes("platelet")) {
    return <CircleDot className="h-5 w-5 text-chart-3" />
  }
  return <Activity className="h-5 w-5 text-muted-foreground" />
}

interface AnalysisResultsProps {
  result: AnalysisResult
  patientName: string
  slideImageUrl: string | null
}

export function AnalysisResults({ result, patientName, slideImageUrl }: AnalysisResultsProps) {
  const hasDetectedDisease = result.diseases.some((d) => d.detected)

  return (
    <div className="flex flex-col gap-6">
      {/* Patient Info & Slide Preview */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 pt-6">
          {/* Slide preview thumbnail */}
          {slideImageUrl && (
            <div className="shrink-0 overflow-hidden rounded-lg border border-border">
              <img
                src={slideImageUrl}
                alt="Uploaded blood slide"
                className="h-28 w-28 object-cover sm:h-32 sm:w-32"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Patient
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">{patientName}</p>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Blood slide analyzed</span>
            </div>
            {hasDetectedDisease && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  Potential condition detected - consult a specialist
                </span>
              </div>
            )}
            {!hasDetectedDisease && (
              <div className="flex items-center gap-2 rounded-md bg-success/10 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">
                  No diseases detected in screening
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-primary" />
            <CardTitle>Analysis Summary</CardTitle>
          </div>
          <CardDescription className="leading-relaxed">{result.summary}</CardDescription>
        </CardHeader>
      </Card>

      {/* Blood Components */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Activity className="h-4 w-4" />
          Blood Components
        </h3>
        <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
          {result.components.map((component) => (
            <Card key={component.name} className="py-4">
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <ComponentIcon name={component.name} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{component.name}</p>
                      <p className="font-mono text-lg font-bold text-foreground">{component.count}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-xs", getStatusColor(component.status))}>
                    {getStatusLabel(component.status)}
                  </Badge>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Distribution</span>
                    <span className="font-mono text-xs text-muted-foreground">{component.percentage}%</span>
                  </div>
                  <Progress value={component.percentage} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Normal range: {component.normalRange}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Disease Detection */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <ShieldAlert className="h-4 w-4" />
          Disease Screening
        </h3>
        <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
          {result.diseases.map((disease) => (
            <Card
              key={disease.name}
              className={cn(
                "py-4 transition-colors",
                disease.detected
                  ? "border-destructive/40 bg-destructive/5 shadow-sm shadow-destructive/10"
                  : "border-success/30 bg-success/5"
              )}
            >
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        disease.detected ? "bg-destructive/15" : "bg-success/15"
                      )}
                    >
                      {disease.detected ? (
                        <ShieldAlert className="h-5 w-5 text-destructive" />
                      ) : (
                        <ShieldCheck className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-foreground">{disease.name}</p>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "text-xs font-semibold px-3",
                      disease.detected
                        ? "bg-destructive text-white"
                        : "bg-success text-success-foreground"
                    )}
                  >
                    {disease.detected ? "Detected" : "Clear"}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{disease.description}</p>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Confidence Level</span>
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {disease.confidence}%
                    </span>
                  </div>
                  <Progress
                    value={disease.confidence}
                    className={cn(
                      "h-2",
                      disease.detected
                        ? "[&_[data-slot=progress-indicator]]:bg-destructive"
                        : "[&_[data-slot=progress-indicator]]:bg-success"
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
