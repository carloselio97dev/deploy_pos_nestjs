import { Controller, Get, Patch, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('user')
  getUser():string {
    return this.appService.getUser();
  }
  @Put('user')
 updateUser():string {
    return this.appService.updateUser();
 }

  @Patch('user')
  patchUser():string {
    return this.appService.patchUser();
  }
}
