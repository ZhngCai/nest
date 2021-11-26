import { Injectable, Param } from '@nestjs/common';
@Injectable()
export class FilesServiceService {
  constructor(private fileServiceRepository) {}
  async findAll(): Promise<void> {
    return;
  }
}
