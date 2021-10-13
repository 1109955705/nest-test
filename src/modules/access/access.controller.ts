import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccessService } from './access.service';
import {
  CreateAccessDto,
  UpdateAccessDto,
  DeleteAccessDto,
} from './access.dto';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.create(createAccessDto);
  }

  @Get()
  findAll() {
    return this.accessService.findAll();
  }

  @Patch(':id')
  update(@Body() param: UpdateAccessDto) {
    return this.accessService.update(param);
  }

  @Delete(':id')
  remove(@Body() param: DeleteAccessDto) {
    return this.accessService.remove(param);
  }
}
