import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtWorkDto } from './dto/create-art-work.dto';
import { UpdateArtWorkDto } from './dto/update-art-work.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtWork } from 'src/database/schemas/art-work.schema';

@Injectable()
export class ArtWorkService {
  constructor(
    @InjectModel(ArtWork.name) private artWorkModel: Model<ArtWork>,
  ) {}
  async create(createArtWorkDto: CreateArtWorkDto): Promise<ArtWork> {
    const newArtWork = new this.artWorkModel(createArtWorkDto);
    return await newArtWork.save();
  }

  async getArtWorks(
    isActive?: boolean,
    skip = 0,
    limit?: number,
  ): Promise<ArtWork[]> {
    const query = this.artWorkModel.find();
    if (isActive !== undefined) {
      query.where('isActive', isActive);
    }

    query.sort({ _id: 1 });
    query.skip(skip);
    if (limit) {
      query.limit(limit);
    }

    const artWorks = await query.exec();
    return artWorks;
  }

  async findOne(id: string): Promise<ArtWork | null> {
    return await this.artWorkModel.findById(id);
  }

  async update(id: string, updateArtWorkDto: UpdateArtWorkDto) {
    const artWork = await this.artWorkModel.findById(id);

    if (!artWork) {
      throw new NotFoundException('Art work not found');
    }
    return await this.artWorkModel.findByIdAndUpdate(id, updateArtWorkDto, {
      new: true,
    });
  }

  async remove(id: number) {
    const artWork = await this.artWorkModel.findById(id);

    if (!artWork) {
      throw new NotFoundException('Art work not found');
    }
  }
}
