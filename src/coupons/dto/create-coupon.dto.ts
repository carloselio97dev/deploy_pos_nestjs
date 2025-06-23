import { IsDate, IsDateString, IsInt, IsNotEmpty, Max, Min } from "class-validator"

export class CreateCouponDto {

    @IsNotEmpty({ message: 'El nombre del cupo es Obligatorio' })
    name: string
    @IsNotEmpty({ message: 'El Descuento no puede ir vacio' })
    @IsInt({ message: 'El descuento debe ser entre 1 y 100' })
    @Max(100, { message: 'El Descuento Maximo es de 100' })
    @Min(1, { message: 'El Descuento minimo es de 1' })
    percentage: number
    @IsNotEmpty({ message: 'La Fecha no puede ir vacio' })
    @IsDateString({}, { message: 'Fecha no Valida' })
    expirationDate: Date


}
