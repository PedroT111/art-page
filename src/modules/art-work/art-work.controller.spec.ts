import { Test, TestingModule } from '@nestjs/testing';
import { ArtWorkController } from './art-work.controller';
import { ArtWorkService } from './art-work.service';

describe('ArtWorkController', () => {
  let controller: ArtWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtWorkController],
      providers: [ArtWorkService],
    }).compile();

    controller = module.get<ArtWorkController>(ArtWorkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
