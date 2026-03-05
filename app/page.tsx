"use client"

import { useState, useCallback } from "react"
import { ConsentModal } from "@/components/consent-modal"
import { PatientInputSection } from "@/components/patient-input-section"
import { AnalysisResults, type AnalysisResult } from "@/components/analysis-results"
import { AnalyzingSkeleton } from "@/components/analyzing-skeleton"
import { Microscope, FlaskConical, ShieldCheck } from "lucide-react"

const MOCK_RESULT: AnalysisResult = {
  summary:
    "Analysis complete. Blood slide shows normal Red Blood Cell morphology with slightly elevated White Blood Cell count. Platelet count is within normal limits. No malaria parasites detected. Abnormal white blood cell proliferation patterns suggest further evaluation for Leukemia.",
  components: [
    {
      name: "Red Blood Cells (RBC)",
      count: "4.8M /\u00B5L",
      percentage: 85,
      status: "normal",
      normalRange: "4.5 - 5.5M /\u00B5L",
    },
    {
      name: "White Blood Cells (WBC)",
      count: "12.4K /\u00B5L",
      percentage: 62,
      status: "high",
      normalRange: "4.5 - 11.0K /\u00B5L",
    },
    {
      name: "Platelets (PLT)",
      count: "245K /\u00B5L",
      percentage: 70,
      status: "normal",
      normalRange: "150 - 400K /\u00B5L",
    },
  ],
  diseases: [
    {
      name: "Leukemia",
      detected: true,
      confidence: 78,
      description:
        "Abnormal proliferation of white blood cells detected. Irregular cell morphology observed consistent with leukemic indicators.",
    },
    {
      name: "Malaria",
      detected: false,
      confidence: 95,
      description:
        "No Plasmodium parasites identified in red blood cell analysis. Slide clear of malaria indicators.",
    },
  ],
}

export default function Home() {
  const [consentGiven, setConsentGiven] = useState(false)
  const [showConsent, setShowConsent] = useState(true)
  const [patientName, setPatientName] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAcceptConsent = useCallback(() => {
    setConsentGiven(true)
    setShowConsent(false)
  }, [])

  const handleDeclineConsent = useCallback(() => {
    setShowConsent(false)
  }, [])

  const handleFileSelect = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setResult(null)
  }, [])

  const handleClear = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setResult(null)
    setIsAnalyzing(false)
    setPatientName("")
  }, [previewUrl])

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true)
    setResult(null)
    setTimeout(() => {
      setResult(MOCK_RESULT)
      setIsAnalyzing(false)
    }, 4000)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Consent Modal */}
      <ConsentModal
        open={showConsent}
        onAccept={handleAcceptConsent}
        onDecline={handleDeclineConsent}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Microscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground">
                Blood Identifier
              </h1>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Automated Blood Slide Analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {consentGiven && (
              <div className="hidden items-center gap-1.5 sm:flex">
                <ShieldCheck className="h-4 w-4 text-success" />
                <span className="text-xs font-medium text-success">Consent Given</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5">
              <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">v1.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {!consentGiven ? (
          /* Declined / No Consent State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShieldCheck className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mt-6 text-xl font-bold text-foreground">
              Consent Required
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              You must accept the data privacy terms to use Blood Identifier. Please refresh the page to review and accept the consent terms.
            </p>
          </div>
        ) : (
          /* Main App Interface */
          <div className="grid gap-8 lg:grid-cols-[420px_1fr] xl:grid-cols-[460px_1fr]">
            {/* Left Column: Input Section */}
            <div>
              <PatientInputSection
                patientName={patientName}
                onPatientNameChange={setPatientName}
                previewUrl={previewUrl}
                onFileSelect={handleFileSelect}
                onClear={handleClear}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                hasResult={!!result}
              />
            </div>

            {/* Right Column: Results */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
                Analysis Report
              </h2>

              {isAnalyzing && <AnalyzingSkeleton />}

              {result && (
                <AnalysisResults
                  result={result}
                  patientName={patientName}
                  slideImageUrl={previewUrl}
                />
              )}

              {!isAnalyzing && !result && (
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/50 py-24 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <Microscope className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="mt-5 text-base font-semibold text-foreground">
                    No analysis yet
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Enter patient details, upload a blood slide image, and click
                    analyze to generate a report
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="text-xs text-muted-foreground">
            Blood Identifier - For educational and screening purposes only
          </p>
          <p className="text-xs text-muted-foreground">
            Not a substitute for professional medical diagnosis
          </p>
        </div>
      </footer>
    </div>
  )
}
