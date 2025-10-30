// src/App.jsx
import React, { useState } from 'react'

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    pincode: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [savedAddress, setSavedAddress] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required'
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be exactly 10 digits'
    }

    // Street Address validation
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street Address is required'
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    // Pincode validation
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be exactly 6 digits'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      // Save address data
      setSavedAddress({ ...formData })
      setIsSubmitted(true)
      
      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        pincode: ''
      })
    } else {
      setErrors(newErrors)
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setSavedAddress(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Shipping Address
          </h1>
          <p className="text-white/80">
            Please fill in your complete shipping details
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && savedAddress && (
          <div className="glass-effect rounded-2xl p-6 mb-6 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Address Saved Successfully!
              </h3>
              <p className="text-white/80 mb-4">
                Your shipping address has been saved and will be used for delivery.
              </p>
              <div className="bg-white/10 rounded-lg p-4 text-left mb-4">
                <h4 className="font-semibold text-white mb-2">Saved Address:</h4>
                <p className="text-white/90"><strong>Name:</strong> {savedAddress.fullName}</p>
                <p className="text-white/90"><strong>Phone:</strong> {savedAddress.phoneNumber}</p>
                <p className="text-white/90"><strong>Address:</strong> {savedAddress.streetAddress}</p>
                <p className="text-white/90"><strong>City:</strong> {savedAddress.city}</p>
                <p className="text-white/90"><strong>State:</strong> {savedAddress.state}</p>
                <p className="text-white/90"><strong>Pincode:</strong> {savedAddress.pincode}</p>
              </div>
              <button
                onClick={handleReset}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Add New Address
              </button>
            </div>
          </div>
        )}

        {/* Address Form */}
        {!isSubmitted && (
          <div className="glass-effect rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border-2 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${
                    errors.fullName ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-300 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border-2 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${
                    errors.phoneNumber ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                />
                {errors.phoneNumber && (
                  <p className="text-red-300 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Street Address *
                </label>
                <textarea
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border-2 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none ${
                    errors.streetAddress ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Enter your complete street address"
                />
                {errors.streetAddress && (
                  <p className="text-red-300 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.streetAddress}
                  </p>
                )}
              </div>

              {/* City and State Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border-2 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${
                      errors.city ? 'border-red-400' : 'border-white/20'
                    }`}
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="text-red-300 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border-2 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${
                      errors.state ? 'border-red-400' : 'border-white/20'
                    }`}
                    placeholder="Enter your state"
                  />
                  {errors.state && (
                    <p className="text-red-300 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border-2 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${
                    errors.pincode ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                />
                {errors.pincode && (
                  <p className="text-red-300 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.pincode}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Save Shipping Address
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Secure & validated address form • Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}

export default App