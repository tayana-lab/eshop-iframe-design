"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, User, FileCheck, CreditCard, Receipt, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type Step = "customer" | "confirmation" | "payment" | "receipt"

export default function AirtimePage() {
  const [currentStep, setCurrentStep] = useState<Step>("customer")
  const [generatedCode, setGeneratedCode] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    mobileNumber: "",
    rechargeType: "",
    amount: "",
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
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required"
    } else if (formData.mobileNumber.length !== 7) {
      newErrors.mobileNumber = "Mobile number must be 7 digits"
    }
    if (!formData.rechargeType) newErrors.rechargeType = "Please select a recharge type"
    if (!formData.amount) newErrors.amount = "Please select an amount"
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
      mobileNumber: "",
      rechargeType: "",
      amount: "",
      verificationCode: "",
      confirmed: false,
      paymentMethod: "visa",
    })
    setErrors({})
    setGeneratedCode(Math.floor(100000 + Math.random() * 900000).toString())
    setCurrentStep("customer")
  }

  const steps = [
    { id: "customer" as Step, label: "Customer Details", icon: User },
    { id: "confirmation" as Step, label: "Confirmation", icon: FileCheck },
    { id: "payment" as Step, label: "Payment", icon: CreditCard },
    { id: "receipt" as Step, label: "Receipt", icon: Receipt },
  ]

  const getStepIndex = (step: Step) => {
    return steps.findIndex((s) => s.id === step)
  }

  const currentStepIndex = getStepIndex(currentStep)

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
              {currentStep === "customer" && <User className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />}
              {currentStep === "confirmation" && (
                <FileCheck className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              )}
              {currentStep === "payment" && <CreditCard className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />}
              {currentStep === "receipt" && <Receipt className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />}
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {currentStep === "customer" && "Customer Details"}
                {currentStep === "confirmation" && "Confirmation"}
                {currentStep === "payment" && "Payment"}
                {currentStep === "receipt" && "Receipt"}
              </h1>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base lg:text-lg text-gray-500">
                {currentStep === "customer" && "Enter your details below and recharge your mobile anytime"}
                {currentStep === "confirmation" && "Review your information before proceeding"}
                {currentStep === "payment" && "Select your payment method"}
                {currentStep === "receipt" && "Transaction completed successfully"}
              </p>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStepIndex
                  const isCurrent = index === currentStepIndex
                  const isLast = index === steps.length - 1

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      {/* Step Circle and Label */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-sm sm:text-base font-semibold transition-all ${
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
                          className={`text-sm sm:text-base font-medium whitespace-nowrap ${
                            isCurrent ? "text-blue-600" : isCompleted ? "text-gray-900" : "text-gray-400"
                          }`}
                          style={isCurrent ? { color: "#006bb6" } : {}}
                        >
                          {step.label}
                        </span>
                      </div>

                      {/* Connector Line */}
                      {!isLast && (
                        <div className="flex-1 mx-2 sm:mx-4">
                          <div className="h-0.5 w-full bg-gray-200" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {/* </CHANGE> */}

          <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg">
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
              {currentStep === "customer" && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                      <div
                        className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-base sm:text-lg font-bold text-white"
                        style={{ backgroundColor: "#006bb6" }}
                      >
                        1
                      </div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Personal Details</h2>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
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
                          <Label htmlFor="mobileNumber" className="text-sm font-medium text-gray-700">
                            Mobile Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "")
                              setFormData({ ...formData, mobileNumber: value })
                              if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: "" })
                            }}
                            className="h-14 rounded-xl border-2 border-gray-200 bg-white px-4 text-base transition-all focus:ring-[3px]"
                            style={
                              {
                                "--tw-ring-color": "rgba(0, 107, 182, 0.25)",
                                borderColor: errors.mobileNumber ? "#ef4444" : "",
                              } as React.CSSProperties
                            }
                            placeholder="Enter your mobile number"
                            maxLength={7}
                            onFocus={(e) => {
                              e.target.style.borderColor = errors.mobileNumber ? "#ef4444" : "#006bb6"
                              e.target.style.borderWidth = "2px"
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.mobileNumber ? "#ef4444" : ""
                              e.target.style.borderWidth = "2px"
                            }}
                          />
                          {errors.mobileNumber && <p className="text-sm text-red-500">{errors.mobileNumber}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                    <div>
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
                          style={{ backgroundColor: "#006bb6" }}
                        >
                          2
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Service Selection</h2>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="rechargeType" className="text-sm font-medium text-gray-700">
                            Recharge Type <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.rechargeType}
                            onValueChange={(value) => {
                              setFormData({ ...formData, rechargeType: value })
                              if (errors.rechargeType) setErrors({ ...errors, rechargeType: "" })
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
                                  borderColor: errors.rechargeType ? "#ef4444" : "#e5e7eb",
                                } as React.CSSProperties
                              }
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = errors.rechargeType ? "#ef4444" : "#006bb6"
                                e.currentTarget.style.borderWidth = "2px"
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor = errors.rechargeType ? "#ef4444" : "#e5e7eb"
                                e.currentTarget.style.borderWidth = "2px"
                              }}
                            >
                              <SelectValue placeholder="Select recharge type..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="credit" className="text-base">
                                Credit
                              </SelectItem>
                              <SelectItem value="local-talktime" className="text-base">
                                Local Talktime
                              </SelectItem>
                              <SelectItem value="jumbo-booster" className="text-base">
                                Jumbo Booster
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.rechargeType && <p className="text-sm text-red-500">{errors.rechargeType}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                            Amount (SCR) <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.amount}
                            onValueChange={(value) => {
                              setFormData({ ...formData, amount: value })
                              if (errors.amount) setErrors({ ...errors, amount: "" })
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
                                  borderColor: errors.amount ? "#ef4444" : "#e5e7eb",
                                } as React.CSSProperties
                              }
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = errors.amount ? "#ef4444" : "#006bb6"
                                e.currentTarget.style.borderWidth = "2px"
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor = errors.amount ? "#ef4444" : "#e5e7eb"
                                e.currentTarget.style.borderWidth = "2px"
                              }}
                            >
                              <SelectValue placeholder="Select amount..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="50" className="text-base">
                                SCR 50
                              </SelectItem>
                              <SelectItem value="100" className="text-base">
                                SCR 100
                              </SelectItem>
                              <SelectItem value="250" className="text-base">
                                SCR 250
                              </SelectItem>
                              <SelectItem value="500" className="text-base">
                                SCR 500
                              </SelectItem>
                              <SelectItem value="1000" className="text-base">
                                SCR 1000
                              </SelectItem>
                              <SelectItem value="1569" className="text-base">
                                SCR 1569
                              </SelectItem>
                              <SelectItem value="2000" className="text-base">
                                SCR 2000
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                        </div>

                        {formData.amount && (
                          <div
                            className="flex items-center justify-between rounded-xl p-4"
                            style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-8 w-8 items-center justify-center rounded-full"
                                style={{ backgroundColor: "#006bb6" }}
                              >
                                <Check className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Selected Plan</p>
                                <p className="text-base font-bold text-gray-900">SCR {formData.amount}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
                          style={{ backgroundColor: "#006bb6" }}
                        >
                          3
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Security Verification</h2>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Verification Code</Label>
                          <div
                            className="flex items-center justify-center gap-4 rounded-xl p-8"
                            style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}
                          >
                            <div
                              className="flex gap-2 text-4xl font-bold tracking-wider md:text-5xl"
                              style={{ color: "#006bb6" }}
                            >
                              {generatedCode.split("").map((digit, i) => (
                                <span key={i}>{digit}</span>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={handleRefreshCode}
                              className="rounded-lg p-2 transition-colors hover:bg-white hover:bg-opacity-50"
                              style={{ color: "#006bb6" }}
                              aria-label="Refresh verification code"
                            >
                              <RefreshCw className="h-5 w-5" />
                            </button>
                          </div>
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

                  <div className="flex flex-col gap-3 sm:gap-4 border-t border-gray-100 pt-4 sm:pt-6 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          contactNumber: "",
                          mobileNumber: "",
                          rechargeType: "",
                          amount: "",
                          verificationCode: "",
                          confirmed: false,
                          paymentMethod: "visa",
                        })
                        setErrors({})
                      }}
                      className="h-12 sm:h-14 rounded-xl border-2 border-gray-200 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-transparent"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="h-12 sm:h-14 rounded-xl px-6 sm:px-8 text-sm sm:text-base font-semibold text-white shadow-lg"
                      style={{
                        backgroundColor: "#006bb6",
                        boxShadow: "0 10px 15px -3px rgba(0, 107, 182, 0.3)",
                      }}
                    >
                      Proceed to Confirm
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === "confirmation" && (
                <div className="space-y-4 sm:space-y-6">
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
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Transaction Target:</p>
                    </div>
                    <div className="space-y-4 px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-700">Mobile Number to be credited: </span>
                        <span className="text-gray-900">{formData.mobileNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Service Type: </span>
                        <span className="text-gray-900">
                          {formData.rechargeType === "credit" && "Credit"}
                          {formData.rechargeType === "local-talktime" && "Local Talktime"}
                          {formData.rechargeType === "jumbo-booster" && "Jumbo Booster"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Purchase Details:</p>
                    </div>
                    <div className="space-y-4 px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-700">Item : </span>
                        <span className="text-gray-900">SR{formData.amount}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Charge (SR): </span>
                        <span className="text-gray-900">{formData.amount}.00</span>
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

                  <div className="flex flex-col gap-3 sm:gap-4 border-t border-gray-100 pt-4 sm:pt-6 sm:flex-row sm:justify-end">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="h-12 sm:h-14 rounded-xl border-2 border-gray-200 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!formData.confirmed}
                      className="h-12 sm:h-14 rounded-xl px-6 sm:px-8 text-sm sm:text-base font-semibold text-white shadow-lg disabled:opacity-50"
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
                <div className="space-y-4 sm:space-y-6">
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
                        <span className="font-medium text-gray-700">Item : </span>
                        <span className="text-gray-900">Credit SR{formData.amount}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 rounded-t-xl px-6 py-3" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                      <p className="font-semibold text-gray-900">Payment Details:</p>
                    </div>
                    <div className="space-y-3 px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-700">Target Number: </span>
                        <span className="text-gray-900">{formData.mobileNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Transaction Amount (SR): </span>
                        <span className="text-gray-900">{formData.amount}.00</span>
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

                  <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(0, 107, 182, 0.05)" }}>
                    <p className="mb-3 font-semibold text-gray-900">Note:</p>
                    <ol className="list-inside list-decimal space-y-2 text-sm text-gray-700">
                      <li>Please ensure that the details you have provided above are correct before proceeding.</li>
                      <li className="text-red-600">
                        *Not allowed - This item is not allowed through this Payment Gateway.
                      </li>
                    </ol>
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-4 border-t border-gray-100 pt-4 sm:pt-6 sm:flex-row sm:justify-end">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="h-12 sm:h-14 rounded-xl border-2 border-gray-200 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="h-12 sm:h-14 rounded-xl px-6 sm:px-8 text-sm sm:text-base font-semibold text-white shadow-lg"
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
                <div className="space-y-4 sm:space-y-6 text-center">
                  <div className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" strokeWidth={3} />
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Successful!</h2>
                    <p className="mt-2 text-base sm:text-lg text-gray-600">Your transaction has been completed</p>
                  </div>

                  <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 p-4 sm:p-6 md:p-8 text-left">
                    <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold text-gray-900">Transaction Receipt</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-sm sm:text-base">Transaction ID</span>
                        <span className="font-mono font-semibold text-gray-900 text-sm sm:text-base break-all">
                          {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-sm sm:text-base">Customer</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-sm sm:text-base">Mobile Number</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">
                          {formData.mobileNumber}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-600 text-sm sm:text-base">Amount</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">
                          SR {formData.amount}.00
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-gray-100 pb-2 sm:pb-3">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">Payment Method</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">Visa Card</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="font-medium text-gray-600 text-sm sm:text-base">Date & Time</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">
                          {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
                    <Button
                      onClick={handleNewTransaction}
                      className="h-12 sm:h-14 rounded-xl px-6 sm:px-8 text-sm sm:text-base font-semibold text-white shadow-lg"
                      style={{
                        backgroundColor: "#006bb6",
                        boxShadow: "0 10px 15px -3px rgba(0, 107, 182, 0.3)",
                      }}
                    >
                      New Transaction
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 sm:h-14 rounded-xl border-2 border-gray-200 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-transparent"
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
