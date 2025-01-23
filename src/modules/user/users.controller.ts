import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { DateAdderInterceptor } from 'src/interceptors/date.adder.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(
    @Body() user: CreateUserDto,
    @Req() request: Request & { now: string },
  ) {
    console.log('entro');
    console.log(request.now);
    return this.usersService.createUser(user, request.now);
  }
}
