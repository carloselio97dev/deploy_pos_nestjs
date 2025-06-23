import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsQueryDto {
        @IsOptional()
        @IsNumberString({}, {message:'La Categoria debe ser un número'})
        category_id:number

        @IsOptional()
        @IsNumberString({}, {message:'La Cantidad debe ser un número'})
        take:number

         @IsOptional()
        @IsNumberString({}, {message:'La Cantidad debe ser un número'})
        skip:number
}