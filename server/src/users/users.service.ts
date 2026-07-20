import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SALT } from 'src/Core/Constants';
import { EXPIRED_TOKEN } from 'src/Core/Constants/constants';
import { Repository } from 'typeorm';

import { LoginUserDTO, RegisterUserDTO } from './dto/register-dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOrCreate(body: RegisterUserDTO): Promise<{ user: User; token: string }> {
    let user = await this.findByEmail(body.email);
    if (!user) {
      user = await this.userRepository.create(body);
      await this.userRepository.save(user);
    }
    const token = await this.generateToken(user);
    return {
      user,
      token,
    };
  }

  async register(registerUserDTO: RegisterUserDTO): Promise<{ user: User; token: string }> {
    const hashedPassword = bcrypt.hashSync(registerUserDTO.password, SALT);
    const existingUser = await this.findByEmail(registerUserDTO.email);

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const user: User = this.userRepository.create({
      ...registerUserDTO,
      password: hashedPassword,
      isActive: true,
    });
    await this.userRepository.save(user);
    const token: string = await this.generateToken(user);

    return { user, token };
  }

  async login(
    loginUserDTO: LoginUserDTO,
  ): Promise<{ user: User; token: string; isOwner: boolean }> {
    const { email, password } = loginUserDTO;
    const user = await this.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) throw new UnauthorizedException();

    const token: string = await this.generateToken(user);
    return { user, token, isOwner: user.isOwner };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user: User | undefined = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.owner', 'owner')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  /// aca falta terminar el update
  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    // Promise<{user:User, token:string}>
    const hashedPassword = bcrypt.hashSync(updateUserDTO.password, SALT);
    console.log(id);

    const user = await this.userRepository.update(id, updateUserDTO);
    // await this.userRepository.save(user);
    // const token : string = await this.generateToken(user);
    console.log(user);

    return new User();
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  private async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async generateToken(user: User) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.isOwner ? 'owner' : 'user',
      },
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: EXPIRED_TOKEN },
    );
    return token;
  }
}
