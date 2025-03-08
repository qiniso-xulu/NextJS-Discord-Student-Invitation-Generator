"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, RefreshCw, Mail, Check } from "lucide-react"
import { Input } from "@/components/ui/input"

export function RegenerateInvite({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showDiscordForm, setShowDiscordForm] = useState(false)
  const [discordUsername, setDiscordUsername] = useState("")
  const [hasRegenerated, setHasRegenerated] = useState(
    // Check localStorage to see if the user has already regenerated the link
    typeof window !== "undefined" ? localStorage.getItem("hasRegenerated") === "true" : false
  )

  // Load regeneration status from localStorage on component mount
  useEffect(() => {
    const storedStatus = localStorage.getItem("hasRegenerated")
    if (storedStatus) {
      setHasRegenerated(storedStatus === "true")
    }
  }, [])

  // Update localStorage whenever hasRegenerated changes
  useEffect(() => {
    localStorage.setItem("hasRegenerated", hasRegenerated.toString())
  }, [hasRegenerated])

  async function handleRegenerate() {
    if (!email || hasRegenerated) return // Prevent regeneration if already done

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate invite")
      }

      setSuccess(true)
      setHasRegenerated(true) // Mark regeneration as done
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmitDiscordUsername() {
    if (!discordUsername) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/submit-discord-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, discordUsername }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit Discord username")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success && !hasRegenerated) {
    return (
      <Alert className="bg-green-50 border-green-200 mt-4">
        <AlertDescription>
          <p className="font-medium">A new invite link has been sent to your email.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Please check your inbox for the new invite link.
          </p>
        </AlertDescription>
      </Alert>
    )
  }

  if (hasRegenerated) {
    return (
      <div className="mt-4 space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <label htmlFor="discordUsername" className="block text-sm font-medium text-gray-700">
            Discord Username
          </label>
          <Input
            id="discordUsername"
            type="text"
            value={discordUsername}
            onChange={(e) => setDiscordUsername(e.target.value)}
            placeholder="Enter your Discord username (e.g., username#1234)"
            className="mt-1"
          />
        </div>

        <Button
          onClick={handleSubmitDiscordUsername}
          variant="outline"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Submit Discord Username
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Please provide your Discord username so we can assist you.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleRegenerate}
        variant="outline"
        className="w-full"
        disabled={isLoading || hasRegenerated} // Disable the button if regeneration is done
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate Invite
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Click the button to generate a new invite link.
      </p>
    </div>
  )
}