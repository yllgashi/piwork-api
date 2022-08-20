import { Injectable } from '@nestjs/common';
import { Experience } from './model/experience.model';
import { AccountRepository } from './account.repository';
import { UserDetails } from './model/user-details.model';

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
    userDetails.technologies = await this.accountRepository.getUserTechnologies(
      userId,
    );
    userDetails.fields = await this.accountRepository.getUserFields(userId);
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

  async getUserFields(userId: number) {
    return await this.accountRepository.getUserFields(userId);
  }

  async createUserTechnology(userId: number, technologyId: number) {
    return await this.accountRepository.createUserTechnology(
      userId,
      technologyId,
    );
  }

  async deleteUserTechnology(userId: number, technologyId: number) {
    return await this.accountRepository.deleteUserTechnology(
      userId,
      technologyId,
    );
  }

  async getUserTechnologies(userId: number) {
    return await this.accountRepository.getUserTechnologies(userId);
  }

  async getUserJobs(userId: number) {
    return await this.accountRepository.getUserJobs(userId);
  }
}
