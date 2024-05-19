/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { AeropuertoEntity } from '../../aeropuerto/aeropuerto.entity/aeropuerto.entity';

@Entity()
export class AerolineaEntity {

    /* Atributos primitivos */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    fechaFundacion: Date;

    @Column()
    paginaWeb: string;

    /* Atributos de asociación */

    /* Una aerolinea tiene varios aeropuertos vinculados */
    @ManyToMany(() => AeropuertoEntity, aeropuerto => aeropuerto.aerolineas)
    aeropuertos: AeropuertoEntity[];

}
