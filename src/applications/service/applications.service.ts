import { Injectable } from '@nestjs/common';
import { ApplicationsRepository } from '../repository/applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(private applicationsRepository: ApplicationsRepository) {}
}
