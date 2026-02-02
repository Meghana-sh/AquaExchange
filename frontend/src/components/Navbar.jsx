import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">💧 AquaExchange</span>
            </Link>
            <div className="ml-10 flex space-x-4">
              <Link to="/listings" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                Browse Water
              </Link>
              {user?.role === 'seller' && (
                <Link to="/create-listing" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Add Listing
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-primary-600">
                  <FaTachometerAlt className="mr-2" />
                  Dashboard
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-primary-600">
                  Orders
                </Link>
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-primary-600">
                  <FaUser className="mr-2" />
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
