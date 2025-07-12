import  { useState, useEffect } from "react";
import { z } from "zod";
import { Shield, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { FooterSmall } from "@/components/FooterSmall";
import { api } from "@/lib/api";

// Schema
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
  phone: z.string().min(1, "Phone required"),
  address: z.string().min(1, "Address required"),
  signature: z
    .instanceof(File, { message: "Signature is required" })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      "Allowed formats: JPG, PNG, PDF"
    ),
});

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    signature: null,
  });

  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    console.log("=== DEBUG STATE ===");
    console.log("formData:", formData);
    console.log("status:", status);
    console.log("errors:", errors);
    console.log("previewUrl:", previewUrl);
    console.log("==================");
  }, [formData, status, errors, previewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFormData((prev) => ({ ...prev, signature: file }));
    setPreviewUrl(URL.createObjectURL(file));

    if (errors.signature) {
      setErrors((prev) => ({ ...prev, signature: "" }));
    }
  };

  const validateForm = () => {
    try {
      signupSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setStatus("loading");

      // Mapping note: The username field in the payload corresponds to the front-end label "Name"
      const payload = {
        username: formData.name.trim(), // backend uses 'username' key
        email: formData.email.trim(),
        password: formData.password,
      };

      const res = await api.post("/signup", payload);

      if (res.data.err) {
        setStatus("error");
        setErrors({ form: res.data.err });
      } else if (res.data.redirect) {
        setStatus("success");
        navigate("/" + res.data.redirect);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setStatus("error");
      setErrors({ form: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
          <div className="bg-white shadow-xl rounded-lg p-8 flex gap-8">
            <div className="flex-1 space-y-6 border-r border-gray-200 pr-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#2A3B7D]">
                  Create Your Account
                </h1>
                <p className="text-gray-500 mt-2">
                  Join CivicSentinel to report and track emergencies
                </p>
              </div>

              {["name", "email", "password", "phone", "address"].map(
                (field) => (
                  <div className="space-y-2" key={field}>
                    <Label htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      id={field}
                      type={field === "password" ? "password" : "text"}
                      value={formData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className={cn(
                        "w-full",
                        errors[field] && "border-red-500"
                      )}
                      placeholder={
                        field === "email" ? "john.doe@example.com" : ""
                      }
                    />
                    <ErrorMsg message={errors[field]} />
                  </div>
                )
              )}
            </div>

            <div className="flex-1 space-y-8 flex flex-col">
              <div>
                <Label htmlFor="signature" className="block mb-4">
                  Signature (JPG, PNG, or PDF)
                </Label>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50",
                    errors.signature ? "border-red-500" : "border-gray-300",
                    formData.signature && "border-green-500 bg-green-50"
                  )}
                >
                  <input
                    id="signature"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <label htmlFor="signature" className="cursor-pointer block">
                    {formData.signature ? (
                      <div className="flex flex-col items-center">
                        {formData.signature.type.startsWith("image/") ? (
                          <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Signature preview"
                            className="max-h-32 object-contain mb-2"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-[#2A3B7D] h-32 justify-center">
                            <Upload className="h-12 w-12" />
                            <span className="text-sm mt-2">PDF Document</span>
                          </div>
                        )}
                        <span className="text-sm text-gray-700 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          {formData.signature.name}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Click to change
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-700">
                          Click to upload your signature
                        </span>
                        <span className="text-xs text-gray-500">
                          JPG, PNG, or PDF
                        </span>
                      </div>
                    )}
                  </label>
                </div>
                <ErrorMsg message={errors.signature} />
              </div>

              <div className="space-y-6 border-t border-gray-200 pt-6">
                <Button
                  type="submit"
                  className="w-full bg-[#2A3B7D] hover:bg-[#1e2a5a] text-white"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="text-[#2A3B7D] hover:underline font-medium"
                  >
                    Log in
                  </button>
                </p>

{errors.form && (
  <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded text-sm flex items-center">
    <AlertCircle className="w-4 h-4 mr-2" />
    {errors.form}
  </div>
)}
{status === "error" && (
  <Alert message="A network error occurred. Please try again." />
)}
                {status === "success" && (
                  <Success message="Account created successfully! You can now log in." />
                )}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

const ErrorMsg = ({ message }) =>
  message ? (
    <p className="text-red-500 text-sm mt-1 flex items-center">
      <AlertCircle className="h-4 w-4 mr-1" />
      {message}
    </p>
  ) : null;

const Alert = ({ message }) => (
  <div className="p-3 bg-red-100 border border-red-300 rounded-md text-red-700 text-sm">
    <p className="flex items-center">
      <AlertCircle className="h-4 w-4 mr-2" />
      {message}
    </p>
  </div>
);

const Success = ({ message }) => (
  <div className="p-3 bg-green-100 border border-green-300 rounded-md text-green-700 text-sm">
    <p className="flex items-center">
      <CheckCircle className="h-4 w-4 mr-2" />
      {message}
    </p>
  </div>
);
