import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';

@Injectable()
export class JobRepository {
  constructor(private readonly databaseService: DatabaseService) {}
}
