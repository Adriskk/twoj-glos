export default interface AddProjectDto {
  title: string;
  description: string;
  cost: number;
  coords?: { lat: number; lng: number };
  project_size: string;
  additional_information: string;
  city: string;
  name: string;
  userId: number;
  localization?: string;
}
