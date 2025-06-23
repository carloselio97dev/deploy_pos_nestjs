import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser():string {
    return 'Lista de Usuario dede AppService- User';
  }
  updateUser():string {
    return 'Desde @Put UpdateUpdate '
  }
  patchUser():string {
    return 'Desde @Patch PatchUser'
  }
}
