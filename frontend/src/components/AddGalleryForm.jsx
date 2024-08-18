import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addGalleryData } from '../services/api'; // Ensure this path is correct
import { FaPlus } from 'react-icons/fa'; // Import the plus icon from react-icons

const AddGalleryForm = () => {
  const [caption, setCaption] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleThumbnailChange = (e) => {
    setThumbnailImage(e.target.files[0]);
  };

  const handleImagesChange = (index, e) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const addImageInput = () => {
    setImages([...images, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the FormData object
    const formData = new FormData();
    formData.append('caption', caption);
    if (thumbnailImage) formData.append('thumbnailImageUrl', thumbnailImage);
    images.forEach((image) => {
      if (image) formData.append('imageUrls', image);
    });

    try {
      await addGalleryData(formData);
      setSuccessMessage('Gallery item added successfully!');
      setErrorMessage('');
      // Clear form fields and reset states
      setCaption('');
      setThumbnailImage(null);
      setImages([]);

      // Navigate after a delay
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to add gallery item. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset form fields
    setCaption('');
    setThumbnailImage(null);
    setImages([]);
    setErrorMessage('');
    setSuccessMessage('');

    // Navigate after a delay
    setTimeout(() => {
      navigate('/admin-dashboard');
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-auto max-h-screen ml-56">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add Gallery Item</h2>
        
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

          {/* Thumbnail Image Upload */}
          <div className="p-4 rounded border border-gray-300">
            <label htmlFor="thumbnailImageUrl" className="block text-gray-700">Thumbnail Image:</label>
            <input
              type="file"
              id="thumbnailImageUrl"
              onChange={handleThumbnailChange}
              accept="image/*"
              required
              className="w-full border border-gray-300 rounded p-2 file:border-none file:bg-orange-500 file:text-white file:py-2 file:px-4 file:rounded"
            />
          </div>

          {/* Additional Images Upload */}
          <div className="p-4 rounded border border-gray-300">
            <label className="block text-gray-700">Additional Images:</label>
            {images.map((_, index) => (
              <div key={index} className="mt-2">
                <label htmlFor={`imageUrl-${index}`} className="block text-gray-700">
                  Image {index + 1}
                </label>
                <input
                  type="file"
                  id={`imageUrl-${index}`}
                  onChange={(e) => handleImagesChange(index, e)}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded p-2 file:border-none file:bg-orange-500 file:text-white file:py-2 file:px-4 file:rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addImageInput}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
            >
              <FaPlus className="mr-2" />
              Add More Images
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700"
            >
              Add Gallery Item
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

export default AddGalleryForm;
