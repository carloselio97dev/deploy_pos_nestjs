import { IsNotEmpty } from "class-validator";

export class ApplyCouponDto {

    @IsNotEmpty({message:'El Nombre del Cupo es Obligatorio'})
    coupon_name:string

}