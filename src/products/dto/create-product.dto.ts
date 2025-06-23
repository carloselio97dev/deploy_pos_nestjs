import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
   @IsNotEmpty({message:'El nombre del Producto es Obligatorio'})
   @IsString({message:"Nombre no valido"})
   name:string  
    @IsNotEmpty({message:'La Imagen del Producto es Obligatorio'})
   image:string  
   @IsNotEmpty({message:'El Precio del Producto es Obligatorio'})
   @IsNumber({maxDecimalPlaces:2},{message:'Precio no Valido'})
   price:number
   @IsNotEmpty({message:'La Cantidad no puede ir Vacia'})
   @IsNumber({maxDecimalPlaces:0},{message:'Cantidad no Valida'})
   inventory:number
   @IsNotEmpty({message:'La Categoria es Obligatoria'})
   @IsInt({message:"La Categoria no es valida"})
   categoryId:number
}
