/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AeropuertoEntity } from './aeropuerto.entity/aeropuerto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../../src/shared/errors/business-errors';

@Injectable()
export class AeropuertoService {

    constructor(
        @InjectRepository(AeropuertoEntity)
        private readonly aeropuertoRepository: Repository<AeropuertoEntity>
    ) {}

    /* CRUD */

    /* Find All */
    async findAll(): Promise<AeropuertoEntity[]> {
        return await this.aeropuertoRepository.find({ relations: ["aerolineas"] });
    }

    /* Find One */
    async findOne(id: string): Promise<AeropuertoEntity> {
        const aeropuerto: AeropuertoEntity = await this.aeropuertoRepository.findOne({
            where: {id: id},
            relations: ["aeropuertos"]
        });

        if (!aeropuerto) {
            throw new BusinessLogicException("The airline with the given id was not found", BusinessError.NOT_FOUND);
        }

        return aeropuerto;
    }

    /* Create */
    async create(aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {

        const airportCode = aeropuerto.codigo;

        if (airportCode.length === 3) {
            return await this.aeropuertoRepository.save(aeropuerto);
        }

        else {
            throw new BusinessLogicException("The airport code must have 3 characters", BusinessError.PRECONDITION_FAILED);
        }
    }

    /* Update */
    async update(id: string, newAeropuertoInfo: AeropuertoEntity): Promise<AeropuertoEntity> {

        /* First, checking that entity exists in the database */
        const persistedAeropuerto: AeropuertoEntity = await this.aeropuertoRepository.findOne
            ({
                where: { id: id }
            })

        if (!persistedAeropuerto) {
            throw new BusinessLogicException("The airport with the given id was not found", BusinessError.NOT_FOUND);
        }

        if (newAeropuertoInfo.codigo.length !== 3) {
            throw new BusinessLogicException("The airport code must have 3 characters", BusinessError.PRECONDITION_FAILED);
        }

        return await this.aeropuertoRepository.save(
            {
                ...persistedAeropuerto,
                ...newAeropuertoInfo
            }
        );
    }

    /* Delete */
    async delete(id: string) {
        const persistedAeropuerto: AeropuertoEntity = await this.aeropuertoRepository.findOne({
            where: { id: id }
        })

        if (!persistedAeropuerto) {
            throw new BusinessLogicException("The airport with the given id was not found", BusinessError.NOT_FOUND);
        }

        await this.aeropuertoRepository.remove(persistedAeropuerto);
    }

}
