import { Module } from '@nestjs/common';
import { ArtWorkService } from './art-work.service';
import { ArtWorkController } from './art-work.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtWork, ArtWorkSchema } from 'src/database/schemas/art-work.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ArtWork.name, schema: ArtWorkSchema }]),
  ],
  controllers: [ArtWorkController],
  providers: [
    ArtWorkService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ArtWorkModule {}
