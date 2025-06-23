import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Category])], //Importa la entidad categoria
  controllers: [CategoriesController],//Le dice que controlador debe usar para categoria
  providers: [CategoriesService], // Este es lo proveedor del servicio
})
export class CategoriesModule {}

/**
 * En este codigo el Modulo de Categorias estoy importando la entidad Categoria usando de Categoria a traves del meotod forFeeature que lo hace un submodulo osea algo interno
 * En conclusion el modulo es el que tiene la estructrua de del modulo valga la redundancia es una forma ordenada trabajar con nest
 * 
 */