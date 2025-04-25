import React, { useEffect, useState } from 'react';
import { Doctor, FilterState } from './types';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';

const App: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    consultationType: '',
    specialities: [],
    sortBy: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    updateURLParams();
    filterDoctors();
  }, [filters, doctors]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      const data = await response.json();
      
      // Transform the API data to match our Doctor interface
      const transformedDoctors: Doctor[] = data.map((doctor: any) => ({
        id: doctor.id,
        name: doctor.name,
        speciality: doctor.specialities.map((s: any) => s.name),
        experience: parseInt(doctor.experience),
        fee: parseInt(doctor.fees.replace('₹ ', '')),
        consultationType: doctor.video_consult ? 'Video Consult' : 'In Clinic',
        image: doctor.photo || doctor.profile_pic || ''
      }));

      setDoctors(transformedDoctors);
      setFilteredDoctors(transformedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const updateURLParams = () => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set('search', filters.searchQuery);
    if (filters.consultationType) params.set('type', filters.consultationType);
    if (filters.specialities.length) params.set('specialities', filters.specialities.join(','));
    if (filters.sortBy) params.set('sort', filters.sortBy);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const filterDoctors = () => {
    let result = [...doctors];

    // Apply search filter
    if (filters.searchQuery) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (filters.consultationType) {
      result = result.filter(doctor =>
        doctor.consultationType === filters.consultationType
      );
    }

    // Apply specialities filter
    if (filters.specialities.length > 0) {
      result = result.filter(doctor =>
        filters.specialities.some(speciality =>
          doctor.speciality.includes(speciality)
        )
      );
    }

    // Apply sorting
    if (filters.sortBy === 'fees') {
      result.sort((a, b) => a.fee - b.fee);
    } else if (filters.sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Doctor</h1>
          <p className="text-gray-600 text-lg">Search, filter, and book appointments with top doctors in your area</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-4">
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <SearchBar filters={filters} setFilters={setFilters} doctors={doctors} />
            </div>
            <DoctorList doctors={filteredDoctors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 