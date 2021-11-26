import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      name: '花花',
      age: 12,
      breed: '花猫',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
