"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Mail, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RegenerateInvite } from "@/components/regenerate-invite"

export default function SuccessPage() {
  const router = useRouter()
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null)

  useEffect(() => {
    const email = sessionStorage.getItem("verifiedEmail")
    setVerifiedEmail(email)
    if (!email) {
      router.push("/")
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full border-2 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Email Verified!</CardTitle>
          <CardDescription>Your WeThinkCode student email has been verified</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-green-500" />
            <span>Discord invite sent to: {verifiedEmail || "your email"}</span>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
              <span>
                If you don't receive the email within a few minutes, please check your spam folder or use the button
                below to generate a new invite.
              </span>
            </AlertDescription>
          </Alert>

          {verifiedEmail && <RegenerateInvite email={verifiedEmail} />}

          <p className="text-sm text-muted-foreground">
            Check your email for the Discord invite link and join our community
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

