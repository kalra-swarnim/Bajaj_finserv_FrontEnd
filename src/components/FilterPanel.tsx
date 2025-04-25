import React, { useState } from 'react';
import { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const specialities = [
  'General Physician',
  'Dentist',
  'Dermatologist',
  'Paediatrician',
  'Gynaecologist',
  'ENT',
  'Diabetologist',
  'Cardiologist',
  'Physiotherapist',
  'Endocrinologist',
  'Orthopaedic',
  'Ophthalmologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Psychiatrist',
  'Urologist',
  'Dietitian/Nutritionist',
  'Psychologist',
  'Sexologist',
  'Nephrologist',
  'Neurologist',
  'Oncologist',
  'Ayurveda',
  'Homeopath'
];

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  const [specialitySearch, setSpecialitySearch] = useState('');
  const hasActiveSort = filters.sortBy !== '';
  const hasActiveFilters = filters.consultationType !== '' || filters.specialities.length > 0 || filters.searchQuery !== '';

  const handleConsultationTypeChange = (type: 'Video Consult' | 'In Clinic') => {
    setFilters(prev => ({
      ...prev,
      consultationType: prev.consultationType === type ? '' : type
    }));
  };

  const handleSpecialityChange = (speciality: string) => {
    setFilters(prev => ({
      ...prev,
      specialities: prev.specialities.includes(speciality)
        ? prev.specialities.filter(s => s !== speciality)
        : [...prev.specialities, speciality]
    }));
  };

  const handleSortChange = (sortBy: 'fees' | 'experience') => {
    setFilters(prev => ({
      ...prev,
      sortBy: prev.sortBy === sortBy ? '' : sortBy
    }));
  };

  const handleClearSort = () => {
    setFilters(prev => ({
      ...prev,
      sortBy: ''
    }));
  };

  const handleClearFilters = () => {
    setFilters(prev => ({
      ...prev,
      consultationType: '',
      specialities: [],
      searchQuery: ''
    }));
    setSpecialitySearch('');
  };

  const filteredSpecialities = specialities.filter(speciality =>
    speciality.toLowerCase().includes(specialitySearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-800 font-medium">
            Filters
            {hasActiveFilters && (
              <span className="ml-2 text-sm text-blue-600">
                ({filters.specialities.length + (filters.consultationType ? 1 : 0)} active)
              </span>
            )}
          </h3>
          {hasActiveFilters && (
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
              onClick={handleClearFilters}
              data-testid="clear-filters"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Specialities */}
        <div className="mb-6">
          <h4 className="text-gray-800 font-medium mb-3" data-testid="filter-header-speciality">
            Specialities
          </h4>
          <div className="relative">
            <input
              type="text"
              placeholder="Search specialities"
              value={specialitySearch}
              onChange={(e) => setSpecialitySearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3"
            />
            <svg className="w-4 h-4 text-gray-400 absolute right-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filteredSpecialities.map(speciality => (
              <label key={speciality} className="flex items-center">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${speciality.replace('/', '-')}`}
                  checked={filters.specialities.includes(speciality)}
                  onChange={() => handleSpecialityChange(speciality)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 text-sm">{speciality}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mode of Consultation */}
        <div>
          <h4 className="text-gray-800 font-medium mb-3" data-testid="filter-header-moc">
            Mode of consultation
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                data-testid="filter-video-consult"
                checked={filters.consultationType === 'Video Consult'}
                onChange={() => handleConsultationTypeChange('Video Consult')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700 text-sm">Video Consultation</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                data-testid="filter-in-clinic"
                checked={filters.consultationType === 'In Clinic'}
                onChange={() => handleConsultationTypeChange('In Clinic')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700 text-sm">In-clinic Consultation</span>
            </label>
          </div>
        </div>
      </div>

      {/* Sort Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-800 font-medium" data-testid="filter-header-sort">
            Sort by
          </h3>
          {hasActiveSort && (
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
              onClick={handleClearSort}
              data-testid="clear-sort"
            >
              Clear Sort
            </button>
          )}
        </div>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700 text-sm">Price: Low-High</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700 text-sm">Experience - Most Experience first</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 