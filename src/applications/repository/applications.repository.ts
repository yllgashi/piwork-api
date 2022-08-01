import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';

@Injectable()
export class ApplicationsRepository {
  constructor(private readonly databaseService: DatabaseService) {}
}
