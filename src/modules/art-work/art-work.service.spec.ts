import { Test, TestingModule } from '@nestjs/testing';
import { ArtWorkService } from './art-work.service';

describe('ArtWorkService', () => {
  let service: ArtWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtWorkService],
    }).compile();

    service = module.get<ArtWorkService>(ArtWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
