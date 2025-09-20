import Footer from '@/components/ui/layout/Footer'
import Navbar from '@/components/ui/layout/Navbar'
import UserDashboard from './userDashBoard'


export default function UserDashBoardWithNav() {
  return (
    <div className="flex flex-col -mt-6  min-h-screen">
      <Navbar />
      <main className="flex-1">
        <UserDashboard />
      </main>
      <Footer />
    </div>
  );
}

