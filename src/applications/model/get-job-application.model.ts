export class GetJobApplication {
  id: number;
  jobId: number;
  jobTitle: string;
  jobDescription: string;
  publisherProfilePic: string;
  applicantFirstName: string;
  applicantLastName: string;
  comment: string;
  jobApplicationPhaseId: string;
  jobApplicationPhaseDescription: string;
  insertDate: Date;
  isActive: boolean;
}
