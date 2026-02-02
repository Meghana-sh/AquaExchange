import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Your Role</h2>
          <p className="text-3xl font-bold text-primary-600 capitalize">{user?.role}</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Account Status</h2>
          <p className="text-2xl font-bold text-green-600">
            {user?.isActive ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Your Rating</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {user?.rating?.average.toFixed(1) || 'N/A'} ⭐
          </p>
        </div>
      </div>

      <div className="mt-8 card">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {user?.role === 'buyer' && (
            <>
              <a href="/listings" className="btn-primary text-center">Browse Water Listings</a>
              <a href="/orders" className="btn-secondary text-center">View My Orders</a>
            </>
          )}
          {user?.role === 'seller' && (
            <>
              <a href="/create-listing" className="btn-primary text-center">Create New Listing</a>
              <a href="/orders" className="btn-secondary text-center">Manage Orders</a>
            </>
          )}
          {user?.role === 'transporter' && (
            <>
              <a href="/orders" className="btn-primary text-center">Available Deliveries</a>
              <a href="/profile" className="btn-secondary text-center">Update Vehicle Info</a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
