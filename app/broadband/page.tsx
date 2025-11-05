"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type Step = "customer" | "confirmation" | "payment" | "receipt"

export default function BroadbandPage() {
  const [currentStep, setCurrentStep] = useState<Step>("customer")
  const [generatedCode, setGeneratedCode] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    username: "",
    gigaBooster: "",
    verificationCode: "",
    confirmed: false,
    paymentMethod: "visa",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setGeneratedCode(Math.floor(100000 + Math.random() * 900000).toString())
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Surname is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (formData.contactNumber && formData.contactNumber.length !== 7) {
      newErrors.contactNumber = "Contact number must be 7 digits"
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }
    if (!formData.gigaBooster) newErrors.gigaBooster = "Please select a giga booster"
    if (!formData.verificationCode.trim()) {
      newErrors.verificationCode = "Verification code is required"
    } else if (formData.verificationCode !== generatedCode) {
      newErrors.verificationCode = "Verification code does not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === "customer" && !validateForm()) return

    const steps: Step[] = ["customer", "confirmation", "payment", "receipt"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const steps: Step[] = ["customer", "confirmation", "payment", "receipt"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleRefreshCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedCode(newCode)
    setFormData({ ...formData, verificationCode: "" })
    if (errors.verificationCode) {
      setErrors({ ...errors, verificationCode: "" })
    }
  }

  const handleNewTransaction = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      username: "",
      gigaBooster: "",
      verificationCode: "",
      confirmed: false,
      paymentMethod: "visa",
    })
    setErrors({})
    setGeneratedCode(Math.floor(100000 + Math.random() * 900000).toString())
    setCurrentStep("customer")
  }

  const steps = [
    { id: "customer" as Step, label: "Customer Details" },
    { id: "confirmation" as Step, label: "Confirmation" },
    { id: "payment" as Step, label: "Payment" },
    { id: "receipt" as Step, label: "Receipt" },
  ]

  const getPackagePrice = (gigaBooster: string) => {
    const prices: Record<string, number> = {
      "10gb": 50.0,
      "25gb": 100.0,
      "50gb": 180.0,
      "100gb": 300.0,
      unlimited: 500.0,
    }
    return prices[gigaBooster] || 0
  }

  const getPackageName = (gigaBooster: string) => {
    const names: Record<string, string> = {
      "10gb": "GIGA 10GB",
      "25gb": "GIGA 25GB",
      "50gb": "GIGA 50GB",
      "100gb": "GIGA 100GB",
      unlimited: "GIGA Unlimited",
    }
    return names[gigaBooster] || ""
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 lg:px-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back to Main Menu
            </Button>
          </Link>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 px-3 py-3 sm:px-4 sm:py-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 sm:mb-4 flex items-center justify-start gap-2 sm:gap-4">
            <div
              className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl shadow-lg"
              style={{ backgroundColor: "#006bb6" }}
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {currentStep === "customer" && "Customer Details"}
                {currentStep === "confirmation" && "Confirmation"}
                {currentStep === "payment" && "Payment"}
                {currentStep === "receipt" && "Receipt"}
              </h1>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base lg:text-lg text-gray-500">
                {currentStep === "customer" && "Enter your details below and select your broadband service"}
                {currentStep === "confirmation" && "Review your information before proceeding"}
                {currentStep === "payment" && "Select your payment method"}
                {currentStep === "receipt" && "Transaction completed successfully"}
              </p>
            </div>
          </div>

          {/* START: Improved stepper responsiveness - hide labels on very small screens */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
                {steps.map((step, index) => {
                  const getStepIndex = (step: Step) => steps.findIndex((s) => s.id === step)
                  const currentStepIndex = getStepIndex(currentStep)
                  const isCompleted = index < currentStepIndex
                  const isCurrent = index === currentStepIndex
                  const isLast = index === steps.length - 1

                  return (
                    <div key={step.id} className="flex items-center">
                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <div
                          className={`flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all ${
                            isCurrent
                              ? "bg-blue-600 text-white"
                              : isCompleted
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-500"
                          }`}
                          style={isCurrent || isCompleted ? { backgroundColor: "#006bb6" } : {}}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`hidden sm:inline text-xs sm:text-sm md:text-base font-medium ${
                            isCurrent ? "text-blue-600" : isCompleted ? "text-gray-900" : "text-gray-400"
                          }`}
                          style={isCurrent ? { color: "#006bb6" } : {}}
                        >
                          {step.label}
                        </span>
                      </div>

                      {!isLast && (
                        <div className="mx-1 sm:mx-2 md:mx-4">
                          <div className="h-0.5 w-8 sm:w-12 md:w-16 bg-gray-200" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {/* END: Improved stepper responsiveness - hide labels on very small screens */}

          <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg">
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
              {currentStep === "customer" && (
                <div className="space-y-6">
                  <div>
                    {/* START: Improved section headers */}
                    <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                      <div
                        className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-base sm:text-lg font-bold text-white"
                        style={{ backgroundColor: "#006bb6" }}
                      >
                        1
                      </div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Personal Details</h2>
                    </div>
                    {/* END: Improved section headers */}

                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => {
                              setFormData({ ...formData, firstName: e.target.value })
                              if (errors.firstName) setErrors({ ...errors, firstName: "" })
                            }}
                            className="h-14 rounded-xl border-2 border-gray-200 bg-white px-4 text-base transition-all focus:ring-[3px]"
                            style={
                              {
                                "--tw-ring-color": "rgba(0, 107, 182, 0.25)",
                                borderColor: errors.firstName ? "#ef4444" : "",
                              } as React.CSSProperties
                            }
                            placeholder="Enter your first name"
                            onFocus={(e) => {
                              e.target.style.borderColor = errors.firstName ? "#ef4444" : "#006bb6"
                              e.target.style.borderWidth = "2px"
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.firstName ? "#ef4444" : ""
                              e.target.style.borderWidth = "2px"
                            }}
                          />
                          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Surname <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => {
                              setFormData({ ...formData, lastName: e.target.value })
                              if (errors.lastName) setErrors({ ...errors, lastName: "" })
                            }}
                            className="h-14 rounded-xl border-2 border-gray-200 bg-white px-4 text-base transition-all focus:ring-[3px]"
                            style={
                              {
                                "--tw-ring-color": "rgba(0, 107, 182, 0.25)",
                                borderColor: errors.lastName ? "#ef4444" : "",
                              } as React.CSSProperties
                            }
                            placeholder="Enter your surname"
                            onFocus={(e) => {
                              e.target.style.borderColor = errors.lastName ? "#ef4444" : "#006bb6"
                              e.target.style.borderWidth = "2px"
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.lastName ? "#ef4444" : ""
                              e.target.style.borderWidth = "2px"
                            }}
                          />
                          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value })
                              if (errors.email) setErrors({ ...errors, email: "" })
                            }}
                            className="h-14 rounded-xl border-2 border-gray-200 bg-white px-4 text-base transition-all focus:ring-[3px]"
                            style={
                              {
                                "--tw-ring-color": "rgba(0, 107, 182, 0.25)",
                                borderColor: errors.email ? "#ef4444" : "",
                              } as React.CSSProperties
                            }
                            placeholder="your.email@example.com"
                            onFocus={(e) => {
                              e.target.style.borderColor = errors.email ? "#ef4444" : "#006bb6"
                              e.target.style.borderWidth = "2px"
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.email ? "#ef4444" : ""
                              e.target.style.borderWidth = "2px"
                            }}
                          />
                          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
                            Contact Number
                          </Label>
                          <Input
                            id="contactNumber"
                            value={formData.contactNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "")
                              setFormData({ ...formData, contactNumber: value })
                              if (errors.contactNumber) setErrors({ ...errors, contactNumber: "" })
                            }}
                            className="h-14 rounded-xl border-2 border-gray-200 bg-white px-4 text-base transition-all focus:ring-[3px]"
                            style={
                              {
                                "--tw-ring-color": "rgba(0, 107, 182, 0.25)",
                                borderColor: errors.contactNumber ? "#ef4444" : "",
                              } as React.CSSProperties
                            }
                            placeholder="Enter your contact number"
                            maxLength={7}
                            onFocus={(e) => {
                              e.target.style.borderColor = errors.contactNumber ? "#ef4444" : "#006bb6"
                              e.target.style.borderWidth = "2px"
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.contactNumber ? "#ef4444" : ""
                              e.target.style.borderWidth = "2px"
                            }}
                          />
                          {errors.contactNumber && <p className="text-sm text-red-500">{errors.contactNumber}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) => {
                              setFormData({ ...formData, username: e.target.value })
                              if (errors.username) setErrors({ ...errors, username: "" })
                            }}
                            className="h-14 rounded-xl border-2 border-gray-200 bg-white px-4 text-base transition-all focus:ring-[3px]"
                            style={
                              {
                                "--tw-ring-color": "rgba(0, 107, 182, 0.25)",
                                borderColor: errors.username ? "#ef4444" : "",
                              } as React.CSSProperties
                            }
                            placeholder="Enter your username"
                            onFocus={(e) => {
                              e.target.style.borderColor = errors.username ? "#ef4444" : "#006bb6"
                              e.target.style.borderWidth = "2px"
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.username ? "#ef4444" : ""
                              e.target.style.borderWidth = "2px"
                            }}
                          />
                          {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      {/* START: Improved section headers */}
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
                          style={{ backgroundColor: "#006bb6" }}
                        >
                          2
                        </div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Service Selection</h2>
                      </div>
                      {/* END: Improved section headers */}

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="gigaBooster" className="text-sm font-medium text-gray-700">
                            Giga Booster <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.gigaBooster}
                            onValueChange={(value) => {
                              setFormData({ ...formData, gigaBooster: value })
                              if (errors.gigaBooster) setErrors({ ...errors, gigaBooster: "" })
                            }}
                          >
                            <SelectTrigger
                              className="w-full rounded-xl border-2 border-gray-200 bg-white text-base transition-all focus:ring-[3px]"
                              style={
                                {
                                  height: "56px",
                                  paddingLeft: "1rem",
                                  paddingRight: "1rem",
                                  "--tw-ring-color": "rgba(0, 107, 182, 0.25)",
                                  borderColor: errors.gigaBooster ? "#ef4444" : "#e5e7eb",
                                } as React.CSSProperties
                              }
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = errors.gigaBooster ? "#ef4444" : "#006bb6"
                                e.currentTarget.style.borderWidth = "2px"
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor = errors.gigaBooster ? "#ef4444" : "#e5e7eb"
                                e.currentTarget.style.borderWidth = "2px"
                              }}
                            >
                              <SelectValue placeholder="Select giga booster..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="10gb" className="text-base">
                                10 GB
                              </SelectItem>
                              <SelectItem value="25gb" className="text-base">
                                25 GB
                              </SelectItem>
                              <SelectItem value="50gb" className="text-base">
                                50 GB
                              </SelectItem>
                              <SelectItem value="100gb" className="text-base">
                                100 GB
                              </SelectItem>
                              <SelectItem value="unlimited" className="text-base">
                                Unlimited
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.gigaBooster && <p className="text-sm text-red-500">{errors.gigaBooster}</p>}
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* START: Improved section headers */}
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
                          style={{ backgroundColor: "#006bb6" }}
                        >
                          3
                        </div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                          Security Verification
                        </h2>
                      </div>
                      {/* END: Improved section headers */}

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Verification Code</Label>
                          {/* START: Improved verification code display */}
                          <div
                            className="flex items-center justify-center gap-2 sm:gap-4 rounded-xl p-3 sm:p-4 md:p-6"
                            style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}
                          >
                            <div
                              className="flex gap-0.5 sm:gap-1 md:gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider"
                              style={{ color: "#006bb6" }}
                            >
                              {generatedCode.split("").map((digit, i) => (
                                <span key={i}>{digit}</span>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={handleRefreshCode}
                              className="rounded-lg p-1.5 sm:p-2 transition-colors hover:bg-white hover:bg-opacity-50"
                              style={{ color: "#006bb6" }}
                              aria-label="Refresh verification code"
                            >
                              <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                          {/* END: Improved verification code display */}
                          <p className="text-center text-sm" style={{ color: "#006bb6" }}>
                            Enter the code below to verify
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="verificationCode" className="text-sm font-medium text-gray-700">
                            Enter Verification Code <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="verificationCode"
                            value={formData.verificationCode}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "")
                              setFormData({ ...formData, verificationCode: value })
                              if (errors.verificationCode) setErrors({ ...errors, verificationCode: "" })
                            }}
                            className="h-14 rounded-xl border-2 border-gray-200 bg-white px-4 text-base transition-all focus:ring-[3px]"
                            style={
                              {
                                "--tw-ring-color": "rgba(0, 107, 182, 0.25)",
                                borderColor: errors.verificationCode ? "#ef4444" : "",
                              } as React.CSSProperties
                            }
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                            onFocus={(e) => {
                              e.target.style.borderColor = errors.verificationCode ? "#ef4444" : "#006bb6"
                              e.target.style.borderWidth = "2px"
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.verificationCode ? "#ef4444" : ""
                              e.target.style.borderWidth = "2px"
                            }}
                          />
                          {errors.verificationCode && <p className="text-sm text-red-500">{errors.verificationCode}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* START: Improved button heights for mobile */}
                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          contactNumber: "",
                          username: "",
                          gigaBooster: "",
                          verificationCode: "",
                          confirmed: false,
                          paymentMethod: "visa",
                        })
                        setErrors({})
                      }}
                      className="h-11 sm:h-12 md:h-14 rounded-xl border-2 border-gray-200 px-4 sm:px-6 md:px-8 text-sm sm:text-base font-semibold bg-transparent"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="h-11 sm:h-12 md:h-14 rounded-xl px-4 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-lg"
                      style={{
                        backgroundColor: "#006bb6",
                        boxShadow: "0 10px 15px -3px rgba(0, 107, 182, 0.3)",
                      }}
                    >
                      Proceed to Confirm
                    </Button>
                  </div>
                  {/* END: Improved button heights for mobile */}
                </div>
              )}

              {currentStep === "confirmation" && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-gray-200 p-6">
                    <p className="text-sm font-medium text-gray-500">eShop Customer:</p>
                    <p className="mt-1 text-xl font-bold text-gray-900">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>

                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Transaction notification will also be sent to:</p>
                    </div>
                    <div className="space-y-4 px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-700">Email : </span>
                        <span className="text-gray-900">{formData.email}</span>
                      </div>
                      {formData.contactNumber && (
                        <div>
                          <span className="font-medium text-gray-700">Contact Number : </span>
                          <span className="text-gray-900">{formData.contactNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Transaction Target:</p>
                    </div>
                    <div className="space-y-4 px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-700">Username: </span>
                        <span className="text-gray-900">{formData.username}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Service Type: </span>
                        <span className="text-gray-900">
                          {formData.gigaBooster === "10gb" && "10 GB"}
                          {formData.gigaBooster === "25gb" && "25 GB"}
                          {formData.gigaBooster === "50gb" && "50 GB"}
                          {formData.gigaBooster === "100gb" && "100 GB"}
                          {formData.gigaBooster === "unlimited" && "Unlimited"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Purchase Details:</p>
                    </div>
                    <div className="space-y-3 px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-700">Item : </span>
                        <span className="text-gray-900">{getPackageName(formData.gigaBooster)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Charge (SCR): </span>
                        <span className="text-gray-900">{getPackagePrice(formData.gigaBooster).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-6">
                    <Checkbox
                      id="confirm"
                      checked={formData.confirmed}
                      onCheckedChange={(checked) => setFormData({ ...formData, confirmed: checked as boolean })}
                      className="mt-1 h-5 w-5"
                    />
                    <Label
                      htmlFor="confirm"
                      className="cursor-pointer text-base font-medium leading-relaxed text-gray-900"
                    >
                      I confirm that the information I have provided is correct.
                    </Label>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="h-14 rounded-xl border-2 border-gray-200 px-8 text-base font-semibold bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!formData.confirmed}
                      className="h-14 rounded-xl px-8 text-base font-semibold text-white shadow-lg disabled:opacity-50"
                      style={{
                        backgroundColor: "#006bb6",
                        boxShadow: "0 10px 15px -3px rgba(0, 107, 182, 0.3)",
                      }}
                    >
                      Proceed to payment
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === "payment" && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Transaction Details:</p>
                    </div>
                    <div className="space-y-3 px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-700">eShop Customer: </span>
                        <span className="text-gray-900">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Service : </span>
                        <span className="text-gray-900">
                          {formData.gigaBooster === "10gb" && "10 GB"}
                          {formData.gigaBooster === "25gb" && "25 GB"}
                          {formData.gigaBooster === "50gb" && "50 GB"}
                          {formData.gigaBooster === "100gb" && "100 GB"}
                          {formData.gigaBooster === "unlimited" && "Unlimited"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Payment Details:</p>
                    </div>
                    <div className="space-y-3 px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-700">Target Username: </span>
                        <span className="text-gray-900">{formData.username}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Transaction Amount (SCR): </span>
                        <span className="text-gray-900">{getPackagePrice(formData.gigaBooster).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Payment Options:</p>
                    </div>
                    <div className="px-6 py-6">
                      <p className="mb-4 text-sm text-gray-700">Please select your preferred payment option</p>

                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                      >
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value="visa" id="visa" className="h-5 w-5" />
                          <Label htmlFor="visa" className="flex cursor-pointer items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold" style={{ color: "#006bb6" }}>
                                VISA
                              </div>
                              <div className="flex h-8 w-12 items-center justify-center rounded bg-gradient-to-r from-orange-500 to-red-500">
                                <div className="flex items-center">
                                  <div className="h-5 w-5 rounded-full bg-red-500" />
                                  <div className="-ml-2 h-5 w-5 rounded-full bg-orange-400" />
                                </div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* ADDED NOTE SECTION */}
                  <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                    <p className="mb-3 font-semibold text-gray-900">Note:</p>
                    <ol className="list-inside list-decimal space-y-2 text-sm text-gray-700 italic">
                      <li>Please ensure that the details you have provided above are correct before proceeding.</li>
                    </ol>
                  </div>
                  {/* END ADDED NOTE SECTION */}

                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="h-14 rounded-xl border-2 border-gray-200 px-8 text-base font-semibold bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="h-14 rounded-xl px-8 text-base font-semibold text-white shadow-lg"
                      style={{
                        backgroundColor: "#006bb6",
                        boxShadow: "0 10px 15px -3px rgba(0, 107, 182, 0.3)",
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === "receipt" && (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-12 w-12 text-green-600" strokeWidth={3} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Payment Successful!</h2>
                    <p className="mt-2 text-lg text-gray-600">Your transaction has been completed</p>
                  </div>

                  {/* START: Improved receipt display for mobile */}
                  <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 p-4 sm:p-6 md:p-8 text-left">
                    <h3 className="mb-4 sm:mb-6 text-base sm:text-lg md:text-xl font-bold text-gray-900">
                      Transaction Receipt
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-xs sm:text-sm md:text-base">
                          Transaction ID
                        </span>
                        <span className="font-mono font-semibold text-gray-900 text-xs sm:text-sm md:text-base break-all">
                          {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-xs sm:text-sm md:text-base">Customer</span>
                        <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-xs sm:text-sm md:text-base">Username</span>
                        <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                          {formData.username}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-xs sm:text-sm md:text-base">Service</span>
                        <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                          {formData.gigaBooster === "10gb" && "10 GB"}
                          {formData.gigaBooster === "25gb" && "25 GB"}
                          {formData.gigaBooster === "50gb" && "50 GB"}
                          {formData.gigaBooster === "100gb" && "100 GB"}
                          {formData.gigaBooster === "unlimited" && "Unlimited"}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-xs sm:text-sm md:text-base">
                          Payment Method
                        </span>
                        <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">Visa Card</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="font-medium text-gray-600 text-xs sm:text-sm md:text-base">Date & Time</span>
                        <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                          {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* END: Improved receipt display for mobile */}

                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button
                      onClick={handleNewTransaction}
                      className="h-14 rounded-xl px-8 text-base font-semibold text-white shadow-lg"
                      style={{
                        backgroundColor: "#006bb6",
                        boxShadow: "0 10px 15px -3px rgba(0, 107, 182, 0.3)",
                      }}
                    >
                      New Transaction
                    </Button>
                    <Button
                      variant="outline"
                      className="h-14 rounded-xl border-2 border-gray-200 px-8 text-base font-semibold bg-transparent"
                    >
                      Download Receipt
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
