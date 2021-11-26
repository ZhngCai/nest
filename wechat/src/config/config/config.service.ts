import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export const envConfig = dotenv.parse(fs.readFileSync('.env'));

@Injectable()
export class ConfigService {}
