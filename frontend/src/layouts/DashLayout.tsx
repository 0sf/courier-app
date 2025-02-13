import { Link, useNavigate } from "react-router-dom"
import useAuthStore from '../store/useAuthStore';

interface LayoutProps {
  children: React.ReactNode
}

export default function DashLayout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore();

  const handleSignOut = () => {
    logout();
    navigate("/login")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold">
            Dashboard
          </Link>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
            <button
              onClick={handleSignOut}
              disabled={!user}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8">
        {children}
      </main>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Swift Courier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}