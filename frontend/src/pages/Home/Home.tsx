import { Link } from "react-router-dom"
import AuthLayout from "../../layouts/AuthLayout";
import { FaBox, FaGlobeAmericas, FaShippingFast } from 'react-icons/fa';
import img from '../../assets/ship_img.jpg'

export default function Home() {
  return (
    <AuthLayout>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={img}
            alt="Courier Service"
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Fast and Reliable Courier Service
          </h1>
          <p className="text-2xl mb-10 text-gray-200">
            Ship your packages with confidence and track them in real-time.
          </p>
          <div className="space-x-6">
            <Link to="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 inline-block">
              Get Started
            </Link>
            <Link to="/track-public"
              className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block">
              Track Shipment
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Domestic Shipping */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-blue-600 mb-4">
                <FaBox className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Domestic Shipping</h3>
              <p className="text-gray-600 text-center">
                Fast and secure shipping within the country with real-time tracking and insurance coverage.
              </p>
            </div>

            {/* International Shipping */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-blue-600 mb-4">
                <FaGlobeAmericas className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">International Shipping</h3>
              <p className="text-gray-600 text-center">
                Reliable worldwide shipping to over 200 countries with customs handling and package protection.
              </p>
            </div>

            {/* Express Delivery */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-blue-600 mb-4">
                <FaShippingFast className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Express Delivery</h3>
              <p className="text-gray-600 text-center">
                Same-day and next-day delivery options available for urgent shipments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold mb-2">200+</h4>
              <p className="text-gray-200">Countries Served</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">1M+</h4>
              <p className="text-gray-200">Packages Delivered</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">24/7</h4>
              <p className="text-gray-200">Customer Support</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">99%</h4>
              <p className="text-gray-200">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  )
}

