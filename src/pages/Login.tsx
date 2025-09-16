import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Password from "@/components/ui/password"
import { toast } from "sonner"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// ✅ Zod Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  agree: z.boolean().refine(val => val === true, { message: "" })
})

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      agree: false
    }
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try { 
        const loginInfo = {
            email: data.email,
            password: data.password
        }
      // এখানে তোমার API কল করবে
      console.log("Login data:", loginInfo)
      toast.success("Logged in Successfully")
      navigate("/")
    } catch (error: any) {
      toast.error(error?.message || "Login failed")
    }
  }

  return (
    <div className="border rounded-xl  shadow-xl space-y-2 mx-4 md:my-20 lg:my-30 mt-40  md:w-3/5 md:mx-auto px-10">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-[#4B1E2F] mt-4">Welcome Back</h1>
        </div>

        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Remember me checkbox */}
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
                    <FormLabel className="text-gray-700">Remember me</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm mb-5">
          Don&apos;t have an account?{" "}
          <Link to="/register" replace className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
