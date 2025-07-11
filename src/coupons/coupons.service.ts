import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {

  constructor(
      @InjectRepository(Coupon) private readonly couponRepository:Repository<Coupon>
  ){

  }

  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto);
  }

  findAll() {
    return this.couponRepository.find();
  }

  async findOne(id: number) {
    const  coupon = await this.couponRepository.findOneBy({id});
    if(!coupon){
      throw new NotFoundException(`El cupon con en el ${id} no fue encontrado`)
    }
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon= await this.findOne(id);
    Object.assign(coupon,updateCouponDto)
    return await this.couponRepository.save(coupon);
  }

  async remove(id: number) {
      const coupon= await this.findOne(id);
       await this.couponRepository.remove(coupon);
      return `El Cupon #${coupon.name} fue eliminado`;
  }

  async applyCupon(name:string){
    const coupon = await this.couponRepository.findOneBy({name});
    if(!coupon){
      throw new NotFoundException('El Cupon no existe');
    }

    const currentDate= new Date();
    const experationDate= endOfDay(coupon.expirationDate);
    if(isAfter(currentDate, experationDate)){
       throw new UnprocessableEntityException("Cupon ya expirado");
    }

    return {
       message:'Cupon Valido',
       ...coupon
    }
    
  }
}
