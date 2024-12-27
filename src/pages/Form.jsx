import React, { useState } from 'react';

const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={name} className="text-lg text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
    </div>
  );
};

const Form = () => {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    country: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!details.firstName) errors.firstName = 'First Name is required';
    if (!details.lastName) errors.lastName = 'Last Name is required';
    if (!details.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(details.email)) errors.email = 'Email is invalid';
    if (!details.city) errors.city = 'City is required';
    if (!details.state) errors.state = 'State is required';
    if (!details.country) errors.country = 'Country is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      try {
        const response = await fetch('https://test.topengr.com/api/v1/assessment/formdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        });

        if (!response.ok) {
          throw new Error('Failed to submit data');
        }

        const result = await response.json();
        console.log('Form submitted successfully:', result);

        setIsSubmitted(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8] p-4 sm:p-6 md:p-8">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-[#144272] mb-8 text-center">Registration Form</h1>

        {isSubmitted ? (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-[#144272] mb-6 text-center">Submitted Details</h2>
              <div className="space-y-4">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-lg">
                    <strong className="text-gray-700 capitalize">{key}:</strong>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-6 mt-8">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg text-xl hover:bg-blue-600 transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-300 text-black py-2 px-6 rounded-lg text-xl hover:bg-gray-400 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={details.firstName}
                    onChange={handleChange}
                    error={validationErrors.firstName}
                  />
                  <InputField
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={details.lastName}
                    onChange={handleChange}
                    error={validationErrors.lastName}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                    error={validationErrors.email}
                  />
                  <InputField
                    label="City"
                    type="text"
                    name="city"
                    value={details.city}
                    onChange={handleChange}
                    error={validationErrors.city}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="State"
                    type="text"
                    name="state"
                    value={details.state}
                    onChange={handleChange}
                    error={validationErrors.state}
                  />
                  <InputField
                    label="Country"
                    type="text"
                    name="country"
                    value={details.country}
                    onChange={handleChange}
                    error={validationErrors.country}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="bg-[#144272] text-white py-2 px-6 rounded-lg text-xl hover:bg-[#0f3562] transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
