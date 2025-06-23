import { CouponsModule } from './../coupons/coupons.module';
import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction, TransactionContent } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { Product } from '../products/entities/product.entity';


@Module({
  imports:[
        TypeOrmModule.forFeature(
          [Transaction, 
            TransactionContent,
             Product
            ]),CouponsModule,],
            
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
