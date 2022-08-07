import { Injectable } from '@nestjs/common';
import { Field } from './model/field.model';
import { Technology } from './model/technology.model';
import { TechnologyRepository } from './technology.repository';

@Injectable()
export class TechnologyService {
  constructor(private technologyRepository: TechnologyRepository) {}

  async getAllTechnologies(): Promise<Technology[]> {
    return await this.technologyRepository.getAllTechnologies();
  }

  async getAllFields(): Promise<Field[]> {
    return await this.technologyRepository.getAllFields();
  }
}
