/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AeropuertoDTO } from './aeropuerto.dto/aeropuerto.dto';
import { AeropuertoEntity } from './aeropuerto.entity/aeropuerto.entity';
import { plainToInstance } from 'class-transformer';


@Controller('aeropuertos')
@UseInterceptors(BusinessErrorsInterceptor)
export class AeropuertoController {

    constructor(private readonly aeropuertoService: AeropuertoService) {}


    @Get()
    async findAll() {
      return await this.aeropuertoService.findAll();
    }

    @Get(':aeropuertoId')
    async findOne(@Param('museumId') museumId: string) {
      return await this.aeropuertoService.findOne(museumId);
    }

    @Post()
    async create(@Body() aerolineaDto: AeropuertoDTO) {
      const aeropuerto: AeropuertoEntity = plainToInstance(AeropuertoEntity, aerolineaDto);
      return await this.aeropuertoService.create(aeropuerto);
    }

    @Put(':aeropuertoId')
    async update(@Param('aeropuertoId') aeropuertoId: string, @Body() aeropuertoDto: AeropuertoDTO) {
      const aeropuerto: AeropuertoEntity = plainToInstance(AeropuertoEntity, aeropuertoDto);
      return await this.aeropuertoService.update(aeropuertoId, aeropuerto);
    }

    @Delete(':aeropuertoId')
    @HttpCode(204)
    async delete(@Param('aeropuertoId') aeropuertoId: string) {
      return await this.aeropuertoService.delete(aeropuertoId);
    }


}
