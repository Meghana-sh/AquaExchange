import { Link } from 'react-router-dom'
import { FaWater, FaShieldAlt, FaUsers, FaTruck } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Solving Water Scarcity Through Smart Trading
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            AquaExchange is the first centralized digital platform enabling structured water trading 
            with real-time availability tracking, transparent pricing, and role-based access for 
            buyers, sellers, and transporters.
          </p>
          <div className="space-x-4">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </Link>
            <Link to="/listings" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition">
              Browse Water Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">The Problem We Solve</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-red-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-red-800">Current Challenges</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✗ Uneven water distribution across regions</li>
                <li>✗ Manual and fragmented trading systems</li>
                <li>✗ Water wastage and inefficient allocation</li>
                <li>✗ Lack of transparency in pricing</li>
                <li>✗ No accountability for water quality</li>
                <li>✗ Poor coordination between stakeholders</li>
              </ul>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-800">Our Solution</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Centralized digital marketplace</li>
                <li>✓ Real-time availability tracking</li>
                <li>✓ Transparent pricing mechanism</li>
                <li>✓ Quality certification system</li>
                <li>✓ Role-based access control</li>
                <li>✓ Administrative oversight & analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWater className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Water quality certificates and test reports for transparency
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                End-to-end encryption and secure payment processing
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">
                Separate dashboards for buyers, sellers, transporters, and admins
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery Tracking</h3>
              <p className="text-gray-600">
                Real-time order tracking from placement to delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Verify</h3>
              <p className="text-gray-600">
                Sign up as a buyer, seller, or transporter and get verified by admin
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Order</h3>
              <p className="text-gray-600">
                Browse available water listings, check quality reports, and place orders
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Receive</h3>
              <p className="text-gray-600">
                Track your order in real-time and receive quality water at your location
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Join the Water Trading Revolution
          </h2>
          <p className="text-xl mb-8">
            Whether you're looking to buy, sell, or transport water, AquaExchange has you covered.
          </p>
          <Link 
            to="/register" 
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
