import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  minLength,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  readonly password: string;
}

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  readonly password: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export class FindUserDto {
  @IsOptional()
  @Length(24, 24, { message: 'id长度必须为24位' })
  readonly id: string;
}

export class DeleteUserByIdDto {
  @Length(24, 24, { message: 'id长度必须为24位' })
  readonly id: string;
}
