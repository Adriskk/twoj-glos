export class CreateProjectDto {
  title: string;
  author: string;
  cost: number;
  votes: number;
  project_size: string;
  description: string;
  localization: string;
  isApproved: boolean;
  city: string;
  userId: number;
  additional_information: string;
  coords: { lng: number; lat: number };
}
