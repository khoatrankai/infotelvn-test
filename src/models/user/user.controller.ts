import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CraeteUserDTO } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'List all bots' })
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('/user-txt')
  createUserTxt():any{
    return this.userService.createUserTxt();
  }
  @Post('/sign-up')
  signUp(@Body() craeteUserDTO:CraeteUserDTO){
    return this.userService.signUp(craeteUserDTO);
  }
  
  
}
