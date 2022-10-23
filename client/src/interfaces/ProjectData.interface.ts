export default interface ProjectDataInterface {
  id: number;
  title: string;
  position: number;
  project_size: string;
  description: string;
  localization: string;
  map_url?: string;
  cost: number;
  votes: number;
  isApproved: boolean;
  coords: { lat: number; lng: number };
  city?: string;
}
