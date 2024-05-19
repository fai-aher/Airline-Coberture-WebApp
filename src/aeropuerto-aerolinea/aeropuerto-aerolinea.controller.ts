/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MuseumArtworkService } from './museum-artwork.service';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class MuseumArtworkController {
   constructor(private readonly museumArtworkService: MuseumArtworkService){}

   /* Método addArtworkMuseum */
   @Post(':museumId/artworks/:artworkId')
   async addArtworkMuseum(@Param('museumId') museumId: string, @Param('artworkId') artworkId: string){
       return await this.museumArtworkService.addArtworkMuseum(museumId, artworkId);
   }

   /* Método findArtworkByMuseumIdArtworkId */
   @Get(':museumId/artworks/:artworkId')
   async findArtworkByMuseumIdArtworkId(@Param('museumId') museumId: string, @Param('artworkId') artworkId: string){
       return await this.museumArtworkService.findArtworkByMuseumIdArtworkId(museumId, artworkId);
   }

   /* Método findArtworksByMuseumId */
   @Get(':museumId/artworks')
   async findArtworksByMuseumId(@Param('museumId') museumId: string){
       return await this.museumArtworkService.findArtworksByMuseumId(museumId);
   }

   /* Método associateArtworksMuseum */
   @Put(':museumId/artworks')
   async associateArtworksMuseum(@Body() artworksDto: ArtworkDto[], @Param('museumId') museumId: string){
       const artworks = plainToInstance(ArtworkEntity, artworksDto)
       return await this.museumArtworkService.associateArtworksMuseum(museumId, artworks);
   }

   /* Método deleteArtworkMuseum */
   @Delete(':museumId/artworks/:artworkId')
   @HttpCode(204)
   async deleteArtworkMuseum(@Param('museumId') museumId: string, @Param('artworkId') artworkId: string){
       return await this.museumArtworkService.deleteArtworkMuseum(museumId, artworkId);
   }


}

