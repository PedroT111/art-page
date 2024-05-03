import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArtWorkService } from './art-work.service';
import { CreateArtWorkDto } from './dto/create-art-work.dto';
import { UpdateArtWorkDto } from './dto/update-art-work.dto';
import { PaginationParams } from './dto/pagination.params';
import { Public } from '../auth/decorators/public.decorator';

@Controller('art-work')
export class ArtWorkController {
  constructor(private readonly artWorkService: ArtWorkService) {}

  @Post()
  create(@Body() createArtWorkDto: CreateArtWorkDto) {
    return this.artWorkService.create(createArtWorkDto);
  }

  @Get()
  findAll(
    @Query() { skip, limit }: PaginationParams,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.artWorkService.getArtWorks(isActive, skip, limit);
  }

  @Get('active')
  @Public()
  findAllActives(@Query() { skip, limit }: PaginationParams) {
    return this.artWorkService.getArtWorks(true, skip, limit);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.artWorkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtWorkDto: UpdateArtWorkDto) {
    return this.artWorkService.update(id, updateArtWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artWorkService.remove(+id);
  }
}
