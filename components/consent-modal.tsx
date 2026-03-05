"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShieldCheck, FileText, User, Image as ImageIcon, BarChart3 } from "lucide-react"

interface ConsentModalProps {
  open: boolean
  onAccept: () => void
  onDecline: () => void
}

export function ConsentModal({ open, onAccept, onDecline }: ConsentModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:mx-0">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">Data Privacy & Consent</DialogTitle>
          <DialogDescription className="leading-relaxed">
            Before proceeding, please review how your data will be used during analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-border bg-secondary/50 p-4">
          <p className="mb-3 text-sm font-medium text-foreground">
            This system collects the following data for medical processing:
          </p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Patient Name</p>
                <p className="text-xs text-muted-foreground">Used to label your analysis report</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <ImageIcon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Blood Slide Images</p>
                <p className="text-xs text-muted-foreground">Processed for component identification</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <BarChart3 className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Analysis Results</p>
                <p className="text-xs text-muted-foreground">Stored temporarily for report generation</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-accent/50 p-3">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Your data is processed securely and is not shared with third parties. By accepting, you consent to the collection and processing of the above data.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={onDecline} className="flex-1 sm:flex-initial">
            Decline
          </Button>
          <Button onClick={onAccept} className="flex-1 sm:flex-initial">
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
