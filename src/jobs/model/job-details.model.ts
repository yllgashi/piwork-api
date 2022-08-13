import { JobField } from './job-field.model';
import { JobTechnology } from './job-technology.model';

export class JobDetails {
  id: number;
  title: string;
  description: string;
  sourceCodeLink: string;
  estimatedDays: number;
  contactEmail: string;
  publishedByUserId: number;
  publishedByUserFirstName: string;
  publishedByUserLastName: string;
  publishedByUserPicture: string;
  priceAmount: number;
  isActive: boolean;
  picture: string;
  jobTechnologies?: JobTechnology[];
  jobFields?: JobField[];
}
