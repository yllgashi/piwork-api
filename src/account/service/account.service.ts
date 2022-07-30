import { Injectable } from '@nestjs/common';
import { UserExperience } from '../model/user-experience.model';
import { AccountRepository } from '../repository/account.repository';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async getUserExperience(userId: number): Promise<UserExperience[]> {
    return await this.accountRepository.getUserExperience(userId);
  }

  async createUserExperience(userId: number, experience: UserExperience) {
    return await this.accountRepository.createUserExperience(
      userId,
      experience,
    );
  }
}
