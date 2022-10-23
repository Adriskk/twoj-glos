export default interface DetailedProjectDataInterface {
  id: number;
  title: string;
  position: number;
  project_size: string;
  localization: string;
  map_url?: string;
  cost: number;
  votes: number;
  isApproved: boolean;
  coords: { lat: number; lng: number };
  description: string;
  additional_information: string;
  author: string;
  voted: boolean;
  isAuthor?: boolean;
}
