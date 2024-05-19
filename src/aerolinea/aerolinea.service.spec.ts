/* eslint-disable prettier/prettier */

import { Test, TestingModule, } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity/aerolinea.entity';
import { TypeOrmTestingConfig } from '../../src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';

describe('AerolineaService', () => {
  let service: AerolineaService;
  let repository: Repository<AerolineaEntity>;
  let aerolineasList: AerolineaEntity[];

  /* SEED DATABASE */
  const seedDatabase = async () => {
    repository.clear();

    aerolineasList = [];
  
    for(let i = 0; i < 5; i++){
        const aerolinea: AerolineaEntity = await repository.save({
        nombre: faker.lorem.sentence(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: faker.date.past(),
        paginaWeb: faker.internet.url()
      });
      aerolineasList.push(aerolinea);
    }
  }

  /* Before each */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineaService],
    }).compile();

    service = module.get<AerolineaService>(AerolineaService);
    repository = module.get<Repository<AerolineaEntity>>(getRepositoryToken(AerolineaEntity))

    await seedDatabase();
  });


  /* Tests for the logic of the entities */

  /* 1. Be defined */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* 2. Find All */
  it('findAll should return all aerolineas', async () => {
    const aerolineas: AerolineaEntity[] = await service.findAll();
    expect(aerolineas).not.toBeNull();
    expect(aerolineas).toHaveLength(aerolineasList.length);
  });

  /* 3. Find One */
  it('findOne should return one aerolinea', async () => {
    const storedAerolinea: AerolineaEntity = aerolineasList[0];
    const aerolinea: AerolineaEntity = await service.findOne(storedAerolinea.id);

    expect(aerolinea).not.toBeNull();
    expect(aerolinea.id).toEqual(storedAerolinea.id);
    expect(aerolinea.nombre).toEqual(storedAerolinea.nombre);
    expect(aerolinea.descripcion).toEqual(storedAerolinea.descripcion);
    expect(aerolinea.fechaFundacion).toEqual(storedAerolinea.fechaFundacion);
    expect(aerolinea.paginaWeb).toEqual(storedAerolinea.paginaWeb);

  });

  /* 4. Find One: Aerolinea no existente */

  it('findOne should throw an exception for an invalid aerolinea', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The airline with the given id was not found")
  });

  /* 5. Create */
  it('create should return a new aerolinea', async () => {
    const aerolinea: AerolineaEntity = {
      id: '123',  // Assuming the ID is auto-generated and initialized with 0 or null
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      fechaFundacion: faker.date.past(),
      paginaWeb: faker.internet.url(),
      aeropuertos: []
    };
  
    const newAerolinea: AerolineaEntity = await service.create(aerolinea);
    expect(newAerolinea).not.toBeNull();
  
    const storedAerolinea: AerolineaEntity = await repository.findOne({ where: { id: newAerolinea.id } });
    expect(storedAerolinea).not.toBeNull();
    expect(storedAerolinea.nombre).toEqual(newAerolinea.nombre);
    expect(storedAerolinea.descripcion).toEqual(newAerolinea.descripcion);
    expect(storedAerolinea.fechaFundacion).toEqual(newAerolinea.fechaFundacion);
    expect(storedAerolinea.paginaWeb).toEqual(newAerolinea.paginaWeb);
  });

  /* 6. Update */
  it('update should modify an aerolinea', async () => {
    const aerolinea: AerolineaEntity = aerolineasList[0];
    aerolinea.nombre = "New Name";
    aerolinea.descripcion = "New Description";
    aerolinea.fechaFundacion = new Date();
    aerolinea.paginaWeb = "https://newwebsite.com";
  
    const updatedAerolinea: AerolineaEntity = await service.update(aerolinea.id, aerolinea);
    expect(updatedAerolinea).not.toBeNull();
  
    const storedAerolinea: AerolineaEntity = await repository.findOne({ where: { id: aerolinea.id } });
    expect(storedAerolinea).not.toBeNull();
    expect(storedAerolinea.nombre).toEqual(aerolinea.nombre);
    expect(storedAerolinea.descripcion).toEqual(aerolinea.descripcion);
    expect(storedAerolinea.fechaFundacion).toEqual(aerolinea.fechaFundacion);
    expect(storedAerolinea.paginaWeb).toEqual(aerolinea.paginaWeb);
  });
  
  /* 7. Update: Aerolinea no existente */
  it('update should throw an exception for an invalid aerolinea', async () => {
    let aerolinea: AerolineaEntity = aerolineasList[0];
    aerolinea = {
      ...aerolinea, 
      nombre: "New Name", 
      descripcion: "New Description", 
      fechaFundacion: new Date(), 
      paginaWeb: "https://newwebsite.com"
    };
  
    await expect(service.update('1', aerolinea)).rejects.toHaveProperty("message", "The airline with the given id was not found");
  });

  /* 8. Delete */
  it('delete should remove an aerolinea', async () => {
    const aerolinea: AerolineaEntity = aerolineasList[1];
    await service.delete(aerolinea.id);
    const deletedAerolinea: AerolineaEntity = await repository.findOne({ where: { id: aerolinea.id } });
    expect(deletedAerolinea).toBeNull();
  });

  
  /* 9. Delete: Aerolinea no existente */
  it('delete should throw an exception for an invalid aerolinea', async () => {
    await expect(service.delete('0')).rejects.toHaveProperty("message", "The airline with the given id was not found");
  });
  

});

