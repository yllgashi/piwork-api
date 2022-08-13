import { Injectable } from '@nestjs/common';
import { UserExperience } from './model/user-experience.model';
import { AccountRepository } from './account.repository';
import { UserDetails } from './model/user-details.model';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async getUserDetails(id: any): Promise<UserDetails> {
    return await this.accountRepository.getUserDetails(id);
  }

  async getUserExperience(userId: number): Promise<UserExperience[]> {
    return await this.accountRepository.getUserExperience(userId);
  }

  async createUserExperience(userId: number, experience: UserExperience) {
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
}
