"use client";

import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { SubscriberSource } from "@/lib/notion";
import { Button } from "./button";

interface NotifyModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  subscriberId: string;
}

export default function NotifyModal({
  isOpen,
  email,
  onClose,
  subscriberId,
}: NotifyModalProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [referralSource, setReferralSource] = useState<
    SubscriberSource | undefined
  >(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/notify", {
        method: "PUT",
        body: JSON.stringify({
          id: subscriberId,
          referralSource,
          jobTitle: jobTitle === "" ? undefined : jobTitle,
          industry: industry === "" ? undefined : industry,
        }),
      });
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">
            You&apos;re on the list!
          </DialogTitle>
          <p className="text-center">
            We&apos;ll notify you at{" "}
            <span className="font-medium">{email}</span> when
            Textpaper launches. Help us understand our audience better
            by sharing a bit more about yourself.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="job-title">
              What&apos;s your job title?
            </Label>
            <Input
              id="job-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">
              What industry do you work in?
            </Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Technology"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referral-source">
              How did you hear about us?
            </Label>
            <Select
              onValueChange={(value) =>
                setReferralSource(value as SubscriberSource)
              }>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Social Media">
                  Social Media
                </SelectItem>
                <SelectItem value="Word of Mouth">
                  Word of Mouth
                </SelectItem>
                <SelectItem value="Search Engine">
                  Search Engine
                </SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="sm:mr-auto">
              Skip
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Information"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
