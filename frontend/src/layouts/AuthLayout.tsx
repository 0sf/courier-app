import { Link } from "react-router-dom"

interface LayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Swift Courier
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8">{children}</main>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Swift Courier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

