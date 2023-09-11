import { plainToClass } from 'class-transformer'
import {
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

  @IsNotEmpty()
  @IsString()
  SESSION_HOST: string

  @IsNotEmpty()
  @IsNumber()
  SESSION_PORT: number

  @IsNotEmpty()
  @IsString()
  SESSION_PREFIX: string

  @IsNotEmpty()
  @IsString()
  SESSION_SECRET: string

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
