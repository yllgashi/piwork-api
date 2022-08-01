import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';

@Injectable()
export class JobsRepository {
  constructor(private readonly databaseService: DatabaseService) {}
}
