import { plainToClass } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator'

class AppEnvironmentVariables {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  PORT: number

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  SESSION_HOST: string

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  SESSION_PORT: number

  @IsOptional()
  @IsBoolean()
  SESSION_DISABLE: boolean

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  SESSION_SECRET: string

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  SESSION_MAX_AGE: number
}

export function validate(config: Record<string, string | number>) {
  const envClass = plainToClass(AppEnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(envClass, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return envClass
}
