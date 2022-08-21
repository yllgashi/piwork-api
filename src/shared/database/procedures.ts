export class Procedure {
  // auth
  static readonly REGISTER: string = 'Administration.usp_User_Register';
  static readonly LOGIN: string = 'Administration.usp_User_Login';
  // skills
  static readonly SKILLS_GET_ALL: string = 'Work.usp_Skill_GetAll';
  // jobs
  static readonly JOB_GET_ALL: string = 'Work.usp_Job_GetAll';
  static readonly JOB_FILTER_BY_TITLE_AND_SKILL: string = 'Work.usp_Job_ByTitleAndSkill'
  static readonly JOB_GET_DETAILS: string = 'Work.usp_Job_GetDetails';
  static readonly JOB_CREATE: string = 'Work.usp_Job_Insert';
  static readonly JOB_UPDATE: string = 'Work.usp_Job_Update';
  static readonly JOB_CHANGE_STATUS: string = 'Work.usp_Job_ChangeJobStatus';
  static readonly JOB_GET_BY_SKILL_ID: string = 'Work.usp_Job_GetBySkill';
  static readonly JOB_GET_REQUIRED_SKILLS: string = 'Work.usp_JobSkills_GetJobRequiredSkills'
  // applications
  static readonly JOB_APPLICATION_GET_BY_USER: string = 'Work.usp_JobApplication_GetByUser';
  static readonly JOB_APPLICATION_GET_DETAILS: string = 'Work.usp_JobApplication_GetDetails'
  static readonly JOB_APPLICATION_CREATE: string = 'Work.usp_JobApplication_Insert';
  static readonly JOB_APPLICATION_DELETE: string = 'Work.usp_JobApplication_Delete';
  static readonly JOB_APPLICATION_CHOOSE_WINNER: string = 'Work.usp_JobApplication_ChooseWinner';
  // app config
  static readonly CONFIG_INSERT: string = 'App.usp_Config_Insert';
  static readonly CONFIG_GET: string = 'App.usp_Config_Get';
  // account
  static readonly USER_GET_DETAILS = "Administration.usp_User_GetAccountDetails";
  static readonly USER_GET_SKILLS = "Work.usp_UserSkills_GetForUser";
  static readonly EXPERIENCE_GET_BY_USER_ID: string = 'Work.usp_Experience_GetForUser';
  static readonly EXPERIENCE_INSERT: string = 'Work.usp_Experience_Insert';
  static readonly EXPERIENCE_DELETE_FOR_USER: string = 'Work.usp_Experience_DeleteForUser';
  static readonly JOB_GET_USER_JOBS: string = 'Work.Job_GetUserJobs';
  // notifications
  static readonly NOTIFICATIONS_GET_BY_USER: string = 'Work.usp_Notifications_GetByUser';
}
