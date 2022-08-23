import { Injectable } from '@nestjs/common';
import { Experience } from './model/experience.model';
import { AccountRepository } from './account.repository';
import { UserDetails } from './model/user-details.model';
import { CreateSkill } from './model/create-skill.model';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async getUserDetails(userId: number): Promise<UserDetails> {
    let userDetails: UserDetails = await this.accountRepository.getUserInfo(
      userId,
    );
    userDetails.experience = await this.accountRepository.getUserExperience(
      userId,
    );
    userDetails.skills = await this.accountRepository.getUserSkills(userId);
    userDetails.jobs = await this.accountRepository.getUserJobs(userId);
    return userDetails;
  }

  async getUserExperience(userId: number): Promise<Experience[]> {
    return await this.accountRepository.getUserExperience(userId);
  }

  async createUserExperience(userId: number, experience: Experience) {
    return await this.accountRepository.createUserExperience(
      userId,
      experience,
    );
  }

  async deleteUserExperience(id: number) {
    return await this.accountRepository.deleteUserExperience(id);
  }

  async getUserJobs(userId: number) {
    return await this.accountRepository.getUserJobs(userId);
  }

  async createUserSkill(userId: number, skill: CreateSkill) {
    return await this.accountRepository.createUserSkill(userId, skill);
  }
}
