import {Product} from '../../products/entities/product.entity';

import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number
    @Column('decimal')
    total:number
    @Column({type:'varchar', length:30, nullable:true})
    coupon:string
    @Column({type:'decimal', nullable:true})
    discount:number
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    transactionDate: Date
    @OneToMany(()=>TransactionContent, (transaction)=> transaction.transaction) /**-aqui se define el tipo de relacion de uno y a muchos y la llave foranea */
    contents: TransactionContent[]

}

@Entity()
export class TransactionContent {
    @PrimaryGeneratedColumn()
    id: number
    @Column('int')
    quantity: number
    @Column('decimal')
    price: number
    @ManyToOne(()=>Product, (product)=> product.id,{eager:true, cascade:true})
    product:Product

    @ManyToOne(()=>Transaction, (transaction)=> transaction.contents , {cascade:true})
    transaction:Transaction
}

