/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class AeropuertoDTO {

/* TODO: Change the attributes */

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
 
 @IsString()
 @IsNotEmpty()
 readonly address: string;
 
 @IsString()
 @IsNotEmpty()
 readonly city: string;
 
 @IsUrl()
 @IsNotEmpty()
 readonly image: string;
}