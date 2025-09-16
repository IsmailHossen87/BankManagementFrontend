import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { FaEnvelope, FaPhone, FaLock, FaSpinner } from "react-icons/fa";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Password from "@/components/ui/password";
import { useRegisterMutation } from "@/redux/feature/auth/auth.Api";
import { toast } from "sonner";
import { useState } from "react";

// Zod Validation
const registerSchema = z
    .object({
        phone: z.string()
            .regex(/^[0-9]{10,15}$/, { message: "Phone number must be 10–15 digits." }),
        email: z.email({ message: "Invalid email address." }),
        password: z.string().min(6, { message: "Password must be at least 6 characters." }),
        confirmpassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." }),
        agree: z.boolean().refine(val => val === true, { message: "" })
    })
    .refine((data) => data.password === data.confirmpassword, {
        path: ["confirmpassword"],
        message: "Passwords do not match.",
    });

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {

    const [register] = useRegisterMutation(undefined)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            phone: "",
            password: "",
            confirmpassword: "",
            agree: false
        }

    })

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setLoading(true)
        const userInfo = {
            email: data.email,
            phone: data.phone,
            password: data.password
        }
        try {
            const res = await register(userInfo)
            console.log(res)
            form.reset()
            toast("User Created Sucessfully")
            navigate("/")

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="border rounded-xl shadow-xl space-y-2 md:my-10 lg:my-20 mt-10 mx-4  md:w-3/5 md:mx-auto px-10">
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
                {/* Heading */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold mt-5">Create your account</h1>
                </div>

                {/* Form Fields */}
                <div className="grid gap-6">
                    <Form {...form}>
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4B1E2F]">Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                placeholder="Enter your Email"
                                                type="email"
                                                {...field}
                                                className="pl-10"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4B1E2F]">Phone</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                placeholder="Enter your Phone Number"
                                                {...field}
                                                className="pl-10"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4B1E2F]">Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Password {...field} className="pl-10" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4B1E2F]">Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Password {...field} className="pl-10" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Checkbox for Agreement */}
                        <FormField
                            control={form.control}
                            name="agree"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-[#4B1E2F]"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />

                                    </FormControl>
                                    <FormLabel className="text-gray-700">
                                        I agree to the{" "}
                                        Privacy Policy and{" "}
                                        Terms of Service
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full mt-2 flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Sign Up......
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>


                    </Form>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-400 mb-4 text-sm">
                    Already have an account?{" "}
                    <Link className="text-black font-semibold" to={"/login"}
                    >Sign in Here</Link>
                </div>
            </form>
        </div>
    )
}
