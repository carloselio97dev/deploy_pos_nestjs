
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContent } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CouponsService } from '../coupons/coupons.service';
@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContent) private readonly transactionContentsRepository: Repository<TransactionContent>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly coupunService: CouponsService

  ) { }
  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(async (transactionEntityManager) => {
      const transaction = new Transaction();
      const total=createTransactionDto.contents.reduce((total, item)=> total+(item.quantity*item.price) ,0)
      transaction.total=total; 
    
      if(createTransactionDto.coupon){
        const coupon= await this.coupunService.applyCupon(createTransactionDto.coupon);
        const discount= (coupon.percentage/100*total);
        transaction.discount=discount;
        transaction.coupon=coupon.name;
        transaction.total-=discount;
      }

      const errors: { productId: number; error: string }[] = [];

      for (const contents of createTransactionDto.contents) {
        const product = await transactionEntityManager.findOneBy(Product, { id: contents.productId })
        if (!product) {
          errors.push({
            productId: contents.productId,
            error: `Producto con ID ${contents.productId} no encontrado`,
          });
          continue;

        }
        if (contents.quantity > product.inventory) {
          errors.push({
            productId: contents.productId,
            error: `El Artículo ${product.name} excede la cantidad disponible`,
          });
          continue;
        }
        product.inventory -= contents.quantity;
        //Crear Instancia de Transaction Contents
        const transactionContent = new TransactionContent();
        transactionContent.price = contents.price;
        transactionContent.product = product;
        transactionContent.quantity = contents.quantity;
        transactionContent.transaction = transaction;

        await transactionEntityManager.save(transaction)
        await transactionEntityManager.save(transactionContent)
      }

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

    })



    return {message:'Venta Almacenada Correctamente'};
  }

  findAll(transactionDate?:string) {
    const option: FindManyOptions<Transaction> = {
        relations:{
            contents:true
        }
    }

    if(transactionDate){
         const date= parseISO(transactionDate)
         if(!isValid(date)){
          throw new BadRequestException("Fecha No Valida");
         }

         const start=startOfDay(date);
         const end=endOfDay(date);
         
         option.where = {
            transactionDate: Between(start,end)
         }
    }


    return  this.transactionRepository.find(option);
  }

  async findOne(id: number) {
    const transaction = await  this.transactionRepository.findOne({
        where:{
          id,
        },
        relations:{
            contents:true
        }
      })

      if(!transaction){
        throw new  NotFoundException('Transaccion no Econtrada')
      }

    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {

    const transaction = await this.findOne(id);
    
    for(const contents of  transaction.contents){

        const product = await this.productRepository.findOneBy({id:contents.product.id});
        if(!product){
            throw new  NotFoundException('Producto no encontrado')
        }
        product.inventory+=contents.quantity;
        await this.productRepository.save(product);
        const transactionContents = await  this.transactionContentsRepository.findOneBy({id:contents.id});
        if(!transactionContents){
            throw new  NotFoundException('Transaccion Content no Econtrada')
        }
        await this.transactionContentsRepository.remove(transactionContents);
    }
    
    await this.transactionRepository.remove(transaction);
    return {message:'Venta Eliminada'}
  }
}
