"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { ArrowRight, LoaderCircle } from "lucide-react";
import NotifyModal from "./notify-modal";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriberId, setSubscriberId] = useState(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const { id } = await res.json();
      setIsLoading(false);
      setSubscriberId(id);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          placeholder="Enter your email"
          value={email}
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              Submitting
              <LoaderCircle className="animate-spin" />
            </>
          ) : (
            <>
              Notify Me
              <ArrowRight />
            </>
          )}
        </Button>
      </form>
      {email !== "" && subscriberId && (
        <NotifyModal
          isOpen={isModalOpen}
          email={email}
          onClose={() => setIsModalOpen(false)}
          subscriberId={subscriberId}
        />
      )}
    </>
  );
}
