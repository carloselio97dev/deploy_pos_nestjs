import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Repository, DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
    constructor( @InjectRepository(Category) private readonly categoryRepository:Repository<Category>,
                @InjectRepository(Product) private readonly productRepository:Repository<Product>,
                private dataSource:DataSource

)
    {}

    async onModuleInit(){
        const connection= this.dataSource;
        await connection.dropDatabase();
        await connection.synchronize();
    }

    async seed(){
        await this.categoryRepository.save(categories);
        for await (const seedProduct of products){
            const category = await this.categoryRepository.findOneBy({id:seedProduct.categoryId})
            if(!category){
                throw new Error("La Categoria No Existe");
            }
            const products=new Product();
            products.name=seedProduct.name;
            products.image=seedProduct.image;
            products.price=seedProduct.price;
            products.inventory=seedProduct.inventory;
            products.category=category;
            await this.productRepository.save(products);

        }
    }
}
