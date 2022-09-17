export class GetJobApplication {
  id: number;
  jobId: number;
  jobTitle: string;
  jobDescription: string;
  publisherProfilePic: string;
  applicantUserId: number;
  applicantFirstName: string;
  applicantLastName: string;
  comment: string;
  jobApplicationPhaseId: string;
  jobApplicationPhaseDescription: string;
  insertDate: Date;
  isActive: boolean;
}
