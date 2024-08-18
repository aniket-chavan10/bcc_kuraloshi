import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateFixtureCard from './UpdateFixtureCard';
import { fetchFixtures } from '../services/api';
import { gsap } from 'gsap';

const UpdateFixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        const fixturesData = await fetchFixtures();
        setFixtures(fixturesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFixtures();
  }, []);

  useEffect(() => {
    if (fixtures.length > 0) {
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.fixture-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 0.2,
        }
      );
    }
  }, [fixtures]);

  const handleEditClick = (id) => {
    navigate(`/admin-dashboard/fixtures/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-gray-600">Loading fixtures...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border border-gray-200 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Fixtures</h2>
      {error && <p className="text-red-600 mb-4 text-center">Error: {error}</p>}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fixtures.map((fixture) => (
          <div key={fixture._id} className="fixture-card">
            <UpdateFixtureCard fixture={fixture} onEditClick={handleEditClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateFixtures;
