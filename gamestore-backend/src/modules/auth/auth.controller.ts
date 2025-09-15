import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtGuard } from '../../common/guards/jwt-auth.guard';
import { LoginDto } from './dtos/login.dto';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from './dtos/registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'User registration.' })
  @Post('/registration')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatarURL'))
  registration(
    @UploadedFile() avatarURL: Express.Multer.File,
    @Body() formData: Record<string, string>,
    @Res() res: Response,
  ) {
    const registrationDTO: RegistrationDto = JSON.parse(formData['data']);
    return this.authService.registerUser(registrationDTO, avatarURL, res);
  }

  @ApiResponse({ status: 200, description: 'User login.' })
  @Post('/login')
  loginUser(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.loginUser(loginDto, res);
  }

  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 200,
    description: 'Get few users (excluding requester).',
  })
  @Get('users/few')
  async getFew(@Req() req: Request, @Res() res: Response) {
    const users = await this.authService.getFewUsers(req.user.id, 5);
    return res.status(200).send(users);
  }

  @ApiResponse({ status: 200, description: 'Verify User' })
  @UseGuards(JwtGuard)
  @Post('/me')
  fetchMe(@Req() req: Request) {
    return req.user;
  }

  @ApiResponse({ status: 200, description: 'User logout.' })
  @Post('/logout')
  logoutUser(@Req() req: Request, @Res() res: Response) {
    return this.authService.logoutUser(req, res);
  }

  @ApiResponse({
    status: 200,
    description: 'Update refresh and access token.',
    headers: {
      'Set-Cookie': {
        description: 'Required: The authentication cookie.',
      },
    },
  })
  @Get('/refresh')
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }
}
