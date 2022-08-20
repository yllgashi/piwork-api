import { Field } from 'src/technology/model/field.model';
import { Technology } from 'src/technology/model/technology.model';
import { Experience } from './experience.model';
import { UserJob } from './user-job.model';

export class UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  roleId: number;
  roleName: string;
  isActive: boolean;
  insertDate: Date;
  profilePic: string;
  experience: Experience[];
  fields: Field[];
  technologies: Technology[];
  jobs: UserJob[];
}
