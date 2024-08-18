import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCarouselData } from '../services/api'; // Adjust the path if necessary

const AddCarouselForm = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('caption', caption);
    if (image) formData.append('imageUrl', image);

    try {
      const response = await addCarouselData(formData);
      setSuccessMessage('Carousel item added successfully!');
      setError(''); // Clear any previous errors
      // Clear form fields
      setCaption('');
      setImage(null);

      // Navigate after a delay
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error adding carousel data:', error);
      setError('Failed to add carousel item. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset form fields
    setCaption('');
    setImage(null);
    setError('');
    setSuccessMessage('');

    // Navigate after a delay
    setTimeout(() => {
      navigate('/admin-dashboard');
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-auto max-h-screen ml-56">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add Carousel Item</h2>
        
        {successMessage && (
          <div className="mb-4 text-green-600 text-center">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Caption */}
          <div className="p-4 rounded border border-gray-300">
            <label htmlFor="caption" className="block text-gray-700">Caption:</label>
            <input
              type="text"
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Caption"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
            />
          </div>

          {/* Image Upload */}
          <div className="p-4 rounded border border-gray-300">
            <label htmlFor="imageUrl" className="block text-gray-700">Image:</label>
            <input
              type="file"
              id="imageUrl"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="w-full border border-gray-300 rounded p-2 file:border-none file:bg-orange-500 file:text-white file:py-2 file:px-4 file:rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
            >
              Add Carousel Item
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarouselForm;
