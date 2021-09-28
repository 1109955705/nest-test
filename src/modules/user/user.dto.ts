import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly name: string;

  @IsInt({ message: '年龄必须是 number 类型' })
  readonly age: number;
}
