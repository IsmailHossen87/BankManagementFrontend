import { Link, Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useMeQuery } from "@/redux/feature/auth/authApi";
import Logo from "@/components/logo";
import { LuLogOut } from "react-icons/lu";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const { data: userData, isLoading } = useMeQuery(undefined);

    const role = userData?.data?.data?.role;

    useEffect(() => {
        if (!isLoading && role) {
            if (role === "USER") {
                navigate("/dashboard/userDashboard");
            } else if (role === "ADMIN") {
                navigate("/dashboard/admin");
            }
        }
    }, [role, isLoading, navigate]);

    // Admin Layout with sidebar
    if (role === "ADMIN") {
        return (
            <div className="flex">
                {/* left sidebar */}
                <div className="w-64 md:w-1/5 bg-[#4B1E2F] text-white min-h-screen flex flex-col p-4">
                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <Logo />
                    </div>

                    {/* Menu Items */}
                    <nav className="mt-8 flex-1 space-y-2">
                        <Link
                            to="/adminDashboard"
                            className="block px-4 py-2 rounded-md bg-[#200D14] hover:bg-[#351524] transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/settings"
                            className="block px-4 py-2 rounded-md hover:bg-[#351524] transition"
                        >
                            Settings
                        </Link>
                    </nav>

                    {/* Log Out */}
                    <div className="mt-auto">
                        <button className="flex items-center gap-2 text-red-400 hover:text-red-300">
                            Logout <LuLogOut className="text-red-500" />
                        </button>
                    </div>
                </div>

                {/* right content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        );
    }

    // User Layout (no sidebar)
    if (role === "USER") {
        return (
            <main className="w-full p-6">
                <Outlet />
            </main>
        );
    }

    // Loading state (optional)
    return <p className="text-center">Loading...</p>;
}
