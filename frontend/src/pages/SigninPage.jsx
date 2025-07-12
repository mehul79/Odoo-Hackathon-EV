import { useState } from "react"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { api } from "@/lib/api"
import { Shield, AlertCircle, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})

const SigninPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLoginError(null)
    setErrors({})

    // Validate form data
    const result = loginSchema.safeParse({ email, password })

    if (!result.success) {
      const fieldErrors = {}
      result.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message
      })
      setErrors(fieldErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const res = await api.post(
        "http://localhost:8000/login",
        { email, password },
        { withCredentials: true }
      )

      if (res.data.err) {
        setLoginError(res.data.err)
      } else if (res.data.redirect) {
        navigate("/" + res.data.redirect)
      }
    } catch (err) {
      console.error(err)
      setLoginError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#2A3B7D]/10 flex items-center justify-center mb-4">
              <LogIn className="w-8 h-8 text-[#2A3B7D]" />
            </div>
            <h1 className="text-2xl font-bold text-[#2A3B7D]">Welcome Back</h1>
            <p className="text-gray-500">Log in to your QForum account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(errors.email && "border-red-500")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(errors.password && "border-red-500")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {loginError}
              </div>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full bg-[#2A3B7D] hover:bg-[#1e2a5a] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <a href="/signup" className="text-[#2A3B7D] font-bold hover:underline">
              Sign Up
            </a>
          </div>

          <p className="mt-8 pt-6 border-t text-xs text-center text-gray-500">
            {"By logging in, you agree to our "}
            <a href="/terms" className="text-[#2A3B7D] hover:underline">
              Terms
            </a>
            {" and "}
            <a href="/privacy" className="text-[#2A3B7D] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}

export default SigninPage
