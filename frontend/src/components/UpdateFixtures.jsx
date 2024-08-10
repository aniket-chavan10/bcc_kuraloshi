import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateFixtureCard from './UpdateFixtureCard';
import { fetchFixtures } from '../services/api'; // Adjust the import path as necessary
import { gsap } from 'gsap';

const UpdateFixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        const fixturesData = await fetchFixtures();
        setFixtures(fixturesData);
      } catch (error) {
        setError(error.message);
      }
    };

    loadFixtures();
  }, []);

  useEffect(() => {
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
  }, [fixtures]);

  const handleEditClick = (id) => {
    navigate(`/admin-dashboard/fixtures/edit/${id}`);
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300 max-w-4xl">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">Manage Fixtures</h2>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
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
