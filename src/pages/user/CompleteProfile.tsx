/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { usePersonalDataMutation } from "@/redux/info/personalData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { ImCheckmark2 } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
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
    annualIncome: z.coerce.number().min(0),
    landOwnershipValue: z.coerce.number().min(0),
    electricityBill: z.coerce.number().min(0),
    mobileMoneyBalance: z.coerce.number().min(0),
    existingLoan: z.coerce.number().min(0).optional(),
    loanAmount: z.coerce.number().min(0).optional(),
    existingLoanRadio: z.enum(["Yes", "No"]).optional(), // ✅ এখানে add করা হয়েছে
  }),
  consent: z.boolean().refine((val) => val === true, { message: "You must agree to share your data" })
});


export default function CompleteProfile() {
  const [personalData] = usePersonalDataMutation(undefined);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate()

  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      personalData: { firstName: "", lastName: "", dateOfBirth: "", gender: "Male" },
      contact: { address: "", city: "", state: "", zipCode: "" },
      financialData: { annualIncome: "", landOwnershipValue: "", electricityBill: "", mobileMoneyBalance: "", existingLoan: "", loanAmount: "", existingLoanRadio: "No" },
      consent: false
    },
  });

  const existingLoanRadio = watch("financialData.existingLoanRadio"); // ✅ full path



  type FormData = {
    personalData: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      gender: "Male" | "Female";
    };
    contact: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
    };
    financialData: {
      annualIncome: number | string;
      landOwnershipValue: number | string;
      electricityBill: number | string;
      mobileMoneyBalance: number | string;
      existingLoan: number | string;
      loanAmount: number | string;
      existingLoanRadio: string;
    };
    consent: boolean;
  };

  // handleNextStep function
  const handleNextStep = async () => {
    let stepFields: Array<
      keyof FormData |
      `personalData.${keyof FormData["personalData"]}` |
      `contact.${keyof FormData["contact"]}` |
      `financialData.${keyof FormData["financialData"]}`
    > = [];

    if (step === 1) {
      stepFields = [
        "personalData.firstName",
        "personalData.lastName",
        "personalData.dateOfBirth",
        "personalData.gender"
      ];
    } else if (step === 2) {
      stepFields = [
        "contact.address",
        "contact.city",
        "contact.state",
        "contact.zipCode"
      ];
    } else if (step === 3) {
      stepFields = [
        "financialData.annualIncome",
        "financialData.landOwnershipValue",
        "financialData.electricityBill",
        "financialData.mobileMoneyBalance",
        "financialData.existingLoan",
        "financialData.loanAmount",
        "financialData.existingLoanRadio",
        "consent"
      ];
    }

    const valid = await trigger(stepFields as any); // type-safe cast
    if (valid) setStep(step + 1);
  };


  const handlePrevStep = () => setStep(step - 1);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await personalData(data).unwrap();
      if (res.success) toast.success("Personal Data created successfully");
      navigate("/creditScore")
    } catch (error) {
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
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex flex-col items-center relative">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step >= s ? "bg-[#4B1E2F] text-white border-[#4B1E2F]" : "border-gray-300 text-gray-400"}`}>
              {step > s ? <ImCheckmark2 /> : s}
            </div>
            <p className={`mt-2 text-sm ${step >= s ? "text-[#4B1E2F] font-semibold" : "text-gray-400"}`}>
              {s === 1 ? "Personal" : s === 2 ? "Contact" : "Financial"}
            </p>
            {s < 3 && (
              <div className="absolute top-5 left-1/2 w-full h-1 -z-10">
                <div className={`h-1 ${step > s ? "bg-[#4B1E2F]" : "bg-gray-300"}`} />
              </div>
            )}
          </div>
        ))}
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
              <button type="button" onClick={handlePrevStep} className="text-gray-400 flex gap-1 items-center">
                <IoIosArrowBack /> Back
              </button>
              <Button type="button" onClick={handleNextStep}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Electricity Bill (FCFA)</label>
                <input {...register("financialData.electricityBill")} type="number" className="border p-2 rounded-lg w-full mb-1" />
                {errors.financialData?.electricityBill && <p className="text-red-500 text-sm">{errors.financialData.electricityBill.message}</p>}
              </div>
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Money Balance (FCFA)</label>
                <input {...register("financialData.mobileMoneyBalance")} type="number" className="border p-2 rounded-lg w-full mb-1" />
                {errors.financialData?.mobileMoneyBalance && <p className="text-red-500 text-sm">{errors.financialData.mobileMoneyBalance.message}</p>}
              </div>
            </div>

           
            {/* Existing Loan Yes/No */}
            <div className="mb-3 flex gap-6 items-center ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                 Existing loans?
              </label>
              <div className="flex items-center  gap-6">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("financialData.existingLoanRadio")}
                  />{" "}
                  Yes
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="No"
                    {...register("financialData.existingLoanRadio")}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {/* Conditional Input Field */}
            {watch("financialData.existingLoanRadio") === "Yes" && (
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Existing Loan Amount (FCFA)
                </label>
                <input
                  type="number"
                  {...register("financialData.existingLoan")}
                  className="border p-2 rounded-lg w-full mb-1"
                />
                {errors.financialData?.existingLoan && (
                  <p className="text-red-500 text-sm">
                    {errors.financialData.existingLoan.message}
                  </p>
                )}
              </div>
            )}

            <div className="mb-3 flex items-center gap-2">
              <input type="checkbox" {...register("consent")} className="w-4 h-4" />
              <span>I agree to share my data with GUEHI AND CO to process my credit score</span>
            </div>
            {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}

            <div className="flex justify-between">
              <button type="button" onClick={handlePrevStep} className="text-gray-400 flex gap-1 items-center">
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
