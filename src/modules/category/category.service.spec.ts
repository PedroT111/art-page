import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Model } from 'mongoose';
import { Category } from 'src/database/schemas/category.schema';

describe('CategoryService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: Category,
          useFactory: () => ({
            new: jest.fn().mockReturnThis(),
            save: jest.fn(),
            find: jest.fn(),
          }),
        },
      ],
    }).compile();
  });
});
