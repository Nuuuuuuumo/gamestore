import { User } from '../../entities/user.entity';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JWTService } from '../jwt/jwt.service';
import { LoginDto } from './dtos/login.dto';
import { RegistrationDto } from './dtos/registration.dto';
import { AwsService } from '../aws/aws.service';
import { BucketService } from '../bucket/bucket.service';
import { BucketRepository } from '../bucket/bucket.repository';
import { Bucket } from '../../entities/bucket.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly bucketRepository: BucketRepository,
    private readonly awsService: AwsService,
    private readonly configService: ConfigService,
    private readonly jwtService: JWTService,
  ) {}

  private secretKey: string = this.configService.get('SECRET_KEY');

  //REGISTER USER
  async registerUser(
    dto: RegistrationDto,
    avatarURL: Express.Multer.File,
    res: Response,
  ) {
    const { firstName, lastName, email, password } = dto;
    const s3Response = await this.awsService.uploadImage(avatarURL);
    const newDto = { ...dto, avatarURL: s3Response };
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      throw new BadRequestException(
        'Not all required fields have been filled in.',
      );
    }
    try {
      const hashSalt = await bcrypt.genSalt(7);
      const hashedPassword = await bcrypt.hash(password, hashSalt);
      const newUser = await this.userRepository.save({
        ...newDto,
        password: hashedPassword,
      });
      const accessToken = await this.jwtService.generateTokens(newUser, res);
      await this.bucketRepository.createBucket(newUser);
      return res.status(200).send({ ...newUser, accessToken });
    } catch (error) {
      if (error.code === '23505') {
        return res
          .status(500)
          .send({ message: 'There is already a user with this email.' });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async getFewUsers(currentUserId: string, limit = 5) {
    return this.userRepository.find({
      where: { id: Not(currentUserId) },
      take: limit,
      order: { createdAt: 'DESC' },
      select: ['id', 'firstName', 'lastName', 'email', 'avatarURL'],
    });
  }

  //LOGIN USER
  async loginUser(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    if (!email?.trim() || !password.trim()) {
      return res
        .status(401)
        .send({ message: 'Not all required fields have been filled in.' });
    }
    const foundedUser = await this.userRepository.findOne({
      where: { email },
    });

    if (
      !foundedUser ||
      !(await bcrypt.compare(password, foundedUser.password))
    ) {
      return res.status(404).send({ message: 'Invalid Credentials.' });
    }
    // REMOVE HARDCODE DELETE
    delete foundedUser.createdAt;
    delete foundedUser.password;
    await this.jwtService.generateTokens(foundedUser, res);
    return res.status(200).send({ ...foundedUser });
  }

  //LOGOUT
  async logoutUser(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    return res
      .status(HttpStatus.OK)
      .send({ message: 'Successfully unauthorized' });
  }

  //REFRESH TOKEN
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token are not set!');
    }
    const refreshTokenPayload = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: this.secretKey,
      })
      .catch(() => {
        throw new UnauthorizedException(
          'Refresh token is expired or not valid',
        );
      });
    const user = await this.userRepository.findOne({
      where: { id: refreshTokenPayload.sub.id },
    });

    if (!user) {
      throw new UnauthorizedException(
        'User doesnt exist. Please check is refresh token valid',
      );
    }
    await this.jwtService.generateTokens(user, res);
    return res.status(200).send({ message: 'Successfully updated' });
  }
}
