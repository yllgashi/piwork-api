import { Injectable } from '@nestjs/common';
import { Technology } from '../model/technology.model';
import { TechnologyRepository } from '../repository/technology.repository';

@Injectable()
export class TechnologyService {
  constructor(private technologyRepository: TechnologyRepository) {}

  async getAll(): Promise<Technology> {
    return await this.technologyRepository.getAll();
  }
}
