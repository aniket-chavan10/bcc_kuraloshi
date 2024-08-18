import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNewsData } from '../services/api'; // Ensure this path is correct

const NewsAddForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    console.log('Submitting form data:', {
      title,
      description,
      image: image ? image.name : 'No image'
    });

    try {
      const result = await addNewsData(formData);
      console.log('API Response:', result);
      setSuccessMessage('News item added successfully!');
      setErrorMessage('');
      // Clear form fields
      setTitle('');
      setDescription('');
      setImage(null);

      // Navigate after a delay
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.error('Error adding news item:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to add news item. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset form fields
    setTitle('');
    setDescription('');
    setImage(null);
    setErrorMessage('');
    setSuccessMessage('');

    // Navigate immediately
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-auto max-h-screen ml-56">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add News</h2>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="p-4 rounded border border-gray-300">
            <label htmlFor="title" className="block text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
            />
          </div>

          {/* Description */}
          <div className="p-4 rounded border border-gray-300">
            <label htmlFor="description" className="block text-gray-700">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
            />
          </div>

          {/* Image Upload */}
          <div className="p-4 rounded border border-gray-300">
            <label htmlFor="image" className="block text-gray-700">Image:</label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border border-gray-300 rounded p-2 file:border-none file:bg-orange-500 file:text-white file:py-2 file:px-4 file:rounded"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700"
            >
              Add News
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

export default NewsAddForm;
