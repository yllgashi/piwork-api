export class GetJobApplication {
  id: number;
  jobId: number;
  jobTitle: string;
  jobDescription: string;
  jobPicture: string;
  comment: string;
  jobApplicationPhaseId: string;
  jobApplicationPhaseDescription: string;
  insertDate: Date;
  isActive: boolean;
}
