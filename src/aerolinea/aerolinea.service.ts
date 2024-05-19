/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity/aerolinea.entity';
import { BusinessError, BusinessLogicException } from '../../src/shared/errors/business-errors';

@Injectable()
export class AerolineaService {

    constructor(
        @InjectRepository(AerolineaEntity)
        private readonly aerolineaRepository: Repository<AerolineaEntity>
    ) {}

    /* CRUD */

    /* Find All */
    async findAll(): Promise<AerolineaEntity[]> {
        return await this.aerolineaRepository.find({relations: ["aeropuertos"]});
    }

    /* Find One */
    async findOne(id: string): Promise<AerolineaEntity> {
        const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
            where: {id: id},
            relations: ["aeropuertos"]
        });

        if (!aerolinea) {
            throw new BusinessLogicException("The airline with the given id was not found", BusinessError.NOT_FOUND);
        }

        return aerolinea;

    }

    /* Create */
    async create(aerolinea: AerolineaEntity): Promise<AerolineaEntity> {

        const currentDate = new Date();

        if (aerolinea.fechaFundacion < currentDate) {
            return await this.aerolineaRepository.save(aerolinea);
        }

        else {
            throw new BusinessLogicException("The foundation date must be less than the current date", BusinessError.PRECONDITION_FAILED);
        }
    }

    /* Update */
    async update(id: string, newAerolineaInfo: AerolineaEntity): Promise<AerolineaEntity> {

        /* First, checking that entity exists in the database */
        const persistedAerolinea: AerolineaEntity = await this.aerolineaRepository.findOne
            ({
                where: { id: id }
            })

        if (!persistedAerolinea) {
            throw new BusinessLogicException("The airline with the given id was not found", BusinessError.NOT_FOUND);
        }

        const currenDate = new Date();

        if (newAerolineaInfo.fechaFundacion > currenDate) {
            throw new BusinessLogicException("The airline's foundation date must be earlier than today", BusinessError.PRECONDITION_FAILED);
        }

        return await this.aerolineaRepository.save(
            {
                ...persistedAerolinea,
                ...newAerolineaInfo
            }
        );
    }

    /* Delete */
    async delete(id: string) {
        const persistedAerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
            where: { id: id }
        })

        if (!persistedAerolinea) {
            throw new BusinessLogicException("The airline with the given id was not found", BusinessError.NOT_FOUND);
        }

        await this.aerolineaRepository.remove(persistedAerolinea);
    }


}
