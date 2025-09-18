/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { usePersonalDataMutation } from "@/redux/feature/personalData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { ImCheckmark2 } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { z } from "zod";

const completeProfileSchema = z.object({
  personalData: z.object({
    firstName: z.string().min(2, "First Name must be at least 2 characters"),
    lastName: z.string().min(2, "Last Name must be at least 2 characters"),
    dateOfBirth: z.string().nonempty("Date of Birth is required"),
    gender: z.enum(["Male", "Female"], "Please select a gender"),
  }),
  contact: z.object({
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    zipCode: z.string().min(4, "Zip Code must be at least 4 characters"),
  }),
  financialData: z.object({
    annualIncome: z
      .string()
      .regex(/^\d+$/, "Annual Income must be a number")
      .nonempty("Annual Income is required"),
    landOwnershipValue: z
      .string()
      .regex(/^\d+$/, "Land Ownership Value must be a number")
      .nonempty("Land Ownership Value is required"),
    electricityBill: z
      .string()
      .regex(/^\d+$/, "Electricity Bill must be a number")
      .nonempty("Electricity Bill is required"),
    mobileMoneyBalance: z
      .string()
      .regex(/^\d+$/, "Mobile Money Balance must be a number")
      .nonempty("Mobile Money Balance is required"),
    existingLoan: z.coerce.boolean().refine(val => val !== undefined, { message: "Please select Yes or No" }),

    loanAmount: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, { message: "You must agree to share your data" })
  }),
});


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stepSchemas: Record<
  1 | 2 | 3,
  z.ZodObject<any>
> = {
  1: completeProfileSchema.pick({ personalData: true }),
  2: completeProfileSchema.pick({ contact: true }),
  3: completeProfileSchema.pick({ financialData: true }),
};



export default function CompleteProfile() {
  const [personalData] = usePersonalDataMutation(undefined);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      personalData: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "Male",
      },
      contact: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
      financialData: {
        annualIncome: "",
        landOwnershipValue: "",
        electricityBill: "",
        mobileMoneyBalance: "",
        existingLoan: false,
        loanAmount: "",
        consent: false
      },
    },
  });

  // Step-wise next handler
  const handleNextStep = async () => {
    let stepFields: ("personalData.firstName" | "personalData.lastName" | "personalData.dateOfBirth" | "personalData.gender" | "contact.address" | "contact.city" | "contact.state" | "contact.zipCode" | "financialData.annualIncome" | "financialData.landOwnershipValue" | "financialData.electricityBill" | "financialData.mobileMoneyBalance" | "financialData.existingLoan" | "financialData.loanAmount" | "financialData.consent")[] = [];

    if (step === 1) {
      stepFields = ["personalData.firstName", "personalData.lastName", "personalData.dateOfBirth", "personalData.gender"];
    } else if (step === 2) {
      stepFields = ["contact.address", "contact.city", "contact.state", "contact.zipCode"];
    } else if (step === 3) {
      stepFields = [
        "financialData.annualIncome",
        "financialData.landOwnershipValue",
        "financialData.electricityBill",
        "financialData.mobileMoneyBalance",
        "financialData.existingLoan",
        "financialData.loanAmount",
        "financialData.consent",
      ];
    }

    const valid = await trigger(stepFields);
    if (valid) setStep(step + 1);
  };


  const handlePrevStep = () => setStep(step - 1);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await personalData(data).unwrap();
      if (res.success) {
        toast.success("Personal Data created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto md:mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-6">
        {/* Step 1 */}
        <div className="flex-1 flex flex-col items-center relative">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step >= 1 ? "bg-[#4B1E2F] text-white border-[#4B1E2F]" : "border-gray-300 text-gray-400"
              }`}
          >
            {step > 1 ? <ImCheckmark2 /> : 1}
          </div>
          <p className={`mt-2 text-sm ${step >= 1 ? "text-[#4B1E2F] font-semibold" : "text-gray-400"}`}>
            Personal
          </p>
          <div className="absolute top-5 left-1/2 w-full h-1 -z-10">
            <div className={`h-1 ${step > 1 ? "bg-[#4B1E2F]" : "bg-gray-300"}`} />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex-1 flex flex-col items-center relative">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step >= 2 ? "bg-[#4B1E2F] text-white border-[#4B1E2F]" : "border-gray-300 text-gray-400"
              }`}
          >
            {step > 2 ? <ImCheckmark2 /> : 2}
          </div>
          <p className={`mt-2 text-sm ${step >= 2 ? "text-[#4B1E2F] font-semibold" : "text-gray-400"}`}>
            Contact
          </p>
          <div className="absolute top-5 left-1/2 w-full h-1 -z-10">
            <div className={`h-1 ${step > 2 ? "bg-[#4B1E2F]" : "bg-gray-300"}`} />
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex-1 flex flex-col items-center relative">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step === 3 ? "bg-[#4B1E2F] text-white border-[#4B1E2F]" : "border-gray-300 text-gray-400"
              }`}
          >
            {step > 3 ? <ImCheckmark2 /> : 3}
          </div>
          <p className={`mt-2 text-sm ${step === 3 ? "text-[#4B1E2F] font-semibold" : "text-gray-400"}`}>
            Financial
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="font-semibold my-4 md:my-6">Personal Information</h2>
            <div className="md:flex gap-4">
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input {...register("personalData.firstName")} type="text" className="border p-2 rounded-lg w-full mb-1" />
                {errors.personalData?.firstName && <p className="text-red-500 text-sm">{errors.personalData.firstName.message}</p>}
              </div>
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input {...register("personalData.lastName")} type="text" className="border p-2 rounded-lg w-full mb-1" />
                {errors.personalData?.lastName && <p className="text-red-500 text-sm">{errors.personalData.lastName.message}</p>}
              </div>
            </div>

            <div className="md:flex gap-4">
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                <input {...register("personalData.dateOfBirth")} type="date" className="border p-2 rounded-lg w-full mb-1" />
                {errors.personalData?.dateOfBirth && <p className="text-red-500 text-sm">{errors.personalData.dateOfBirth.message}</p>}
              </div>

              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select {...register("personalData.gender")} className="border p-2 rounded-lg w-full mb-1">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.personalData?.gender && <p className="text-red-500 text-sm">{errors.personalData.gender.message}</p>}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={handleNextStep}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="font-semibold my-4 md:my-6">Contact Information</h2>
            <div className="w-full mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input {...register("contact.address")} type="text" className="border p-2 rounded-lg w-full mb-1" />
              {errors.contact?.address && <p className="text-red-500 text-sm">{errors.contact.address.message}</p>}
            </div>

            <div className="md:flex gap-3">
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input {...register("contact.city")} type="text" className="border p-2 rounded-lg w-full mb-1" />
                {errors.contact?.city && <p className="text-red-500 text-sm">{errors.contact.city.message}</p>}
              </div>
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input {...register("contact.state")} type="text" className="border p-2 rounded-lg w-full mb-1" />
                {errors.contact?.state && <p className="text-red-500 text-sm">{errors.contact.state.message}</p>}
              </div>

              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input {...register("contact.zipCode")} type="text" className="border p-2 rounded-lg w-full mb-1" />
                {errors.contact?.zipCode && <p className="text-red-500 text-sm">{errors.contact.zipCode.message}</p>}
              </div>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={handlePrevStep} className="text-gray-400 flex gap-1 items-center justify-center">
                <IoIosArrowBack /> Back
              </button>
              <Button type="button" onClick={handleNextStep}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 className="font-semibold my-4 md:my-6">Financial Information</h2>
            <div className="md:flex gap-4">
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (FCFA)</label>
                <input {...register("financialData.annualIncome")} type="number" className="border p-2 rounded-lg w-full mb-1" />
                {errors.financialData?.annualIncome && <p className="text-red-500 text-sm">{errors.financialData.annualIncome.message}</p>}
              </div>
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Land Ownership Value (FCFA)</label>
                <input {...register("financialData.landOwnershipValue")} type="number" className="border p-2 rounded-lg w-full mb-1" />
                {errors.financialData?.landOwnershipValue && <p className="text-red-500 text-sm">{errors.financialData.landOwnershipValue.message}</p>}
              </div>
            </div>

            <div className="md:flex gap-4">
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Electricite Bill (FCFA)</label>
                <input {...register("financialData.electricityBill")} type="number" className="border p-2 rounded-lg w-full mb-1" />
                {errors.financialData?.electricityBill && <p className="text-red-500 text-sm">{errors.financialData.electricityBill.message}</p>}
              </div>
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile money Balance (FCFA)</label>

                <input {...register("financialData.mobileMoneyBalance")} type="number" className="border p-2 rounded-lg w-full mb-1" />
                {errors.financialData?.mobileMoneyBalance && <p className="text-red-500 text-sm">{errors.financialData.mobileMoneyBalance.message}</p>}
              </div>
            </div>
            {/* checkBox */}
            {/* Existing Loan Radio */}
            <div className="mb-3">
              <label className="mr-3">Existing Loan?</label>

              <input
                type="radio"
                value="true"
                {...register("financialData.existingLoan", {
                  setValueAs: (v) => v === "true", // ✅ string to boolean
                })}
              />{" "}
              Yes

              <input
                type="radio"
                value="false"
                className="ml-4"
                {...register("financialData.existingLoan", {
                  setValueAs: (v) => v === "true", // ✅ same logic for false
                })}
              />{" "}
              No

              {errors.financialData?.existingLoan && (
                <p className="text-red-500 text-sm">
                  {errors.financialData.existingLoan.message}
                </p>
              )}
            </div>


            <input {...register("financialData.loanAmount")} type="number" placeholder="Loan Amount" className="border p-2 rounded-lg w-full mb-3" />



            <div className="mb-3 flex items-center gap-2">
              <input
                type="checkbox"
                {...register("financialData.consent")}
                className="w-4 h-4"
              />
              <span>
                I agree to share my data with GUEHI AND CO to process my credit score
              </span>
            </div>
            {errors.financialData?.consent && (
              <p className="text-red-500 text-sm">
                {errors.financialData.consent.message}
              </p>
            )}




            <div className="flex justify-between">
              <button type="button" onClick={handlePrevStep} className="text-gray-400 flex gap-1 items-center justify-center">
                <IoIosArrowBack /> Back
              </button>
              <Button type="submit">
                {loading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
