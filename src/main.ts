import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const port=process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
      whitelist:true
  }))
  app.useStaticAssets(join(__dirname,'../public'))

   app.enableCors({
    origin: ['https://deploy-nextjs-pos-six.vercel.app'],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
