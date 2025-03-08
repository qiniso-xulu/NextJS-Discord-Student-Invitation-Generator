"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GithubSuccessPage() {
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
          <CardTitle className="text-2xl font-bold">Verification Complete!</CardTitle>
          <CardDescription>You have successfully completed your verification</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground mt-4">
            Thank you for verifying your WeThinkCode student email and providing your GitHub username. You can now join
            the Discord community with your verified credentials.
          </p>
          <p className="text-sm font-medium">Check your email for the Discord invite link if you haven't already.</p>
        </CardContent>
      </Card>
    </main>
  )
}

