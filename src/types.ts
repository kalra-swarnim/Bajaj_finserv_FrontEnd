export interface Doctor {
  id: string;
  name: string;
  speciality: string[];
  experience: number;
  fee: number;
  consultationType: 'Video Consult' | 'In Clinic';
  image: string; // URL to the doctor's image
}

export interface FilterState {
  searchQuery: string;
  consultationType: 'Video Consult' | 'In Clinic' | '';
  specialities: string[];
  sortBy: 'fees' | 'experience' | '';
} 