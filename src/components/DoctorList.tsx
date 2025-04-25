import React from 'react';
import { Doctor } from '../types';

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  const defaultImage = 'https://via.placeholder.com/120x120?text=Doctor';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop if default image also fails
    target.src = defaultImage;
  };

  return (
    <div className="space-y-6">
      {doctors.map(doctor => (
        <div
          key={doctor.id}
          data-testid="doctor-card"
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="p-6 flex">
            {/* Doctor Image */}
            <div className="flex-shrink-0 mr-6">
              <img
                src={doctor.image || defaultImage}
                alt={`Dr. ${doctor.name}`}
                className="w-28 h-28 rounded-lg object-cover bg-gray-100"
                onError={handleImageError}
                loading="lazy"
              />
            </div>

            {/* Doctor Information */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3
                    data-testid="doctor-name"
                    className="text-2xl font-semibold text-gray-800 mb-2"
                  >
                    {doctor.name}
                  </h3>
                  <div
                    data-testid="doctor-specialty"
                    className="text-gray-600 mb-4"
                  >
                    {Array.isArray(doctor.speciality) ? doctor.speciality.join(', ') : 'No speciality listed'}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {doctor.consultationType || 'Consultation type not specified'}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {doctor.experience || 0} years experience
                    </span>
                  </div>
                </div>
                <div className="text-right ml-6">
                  <div
                    data-testid="doctor-fee"
                    className="text-2xl font-bold text-blue-600 mb-2"
                  >
                    ₹{doctor.fee || 0}
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {doctors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-lg">
          <div className="text-gray-500 text-lg mb-4">No doctors found matching your criteria</div>
          <p className="text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
