import { Skill } from 'src/skills/model/skill.model';

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
  publisherProfilePic: string;
  priceAmount: number;
  isActive: boolean;
  hasUserApplied: boolean;
  requiredSkills?: Skill[];
}
