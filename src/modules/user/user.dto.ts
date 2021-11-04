import { IsOptional, IsNotEmpty, Length } from 'class-validator';
import { Type, Transform, Exclude, Expose } from 'class-transformer';

@Exclude()
export class Testxx {
  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  b: string;
}

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

  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  // @Type((t) => {
  //   console.log('Type', t);
  //   return Testxx;
  // })
  @Transform(({ value, obj, type, options }) => {
    console.log('second', value, obj, options);
    return [
      {
        c: 2,
      },
    ];
  })
  readonly password: {
    a: string;
  };
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
