import { IsDefined, IsNotEmpty, IsNumber, isNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateProdutoDto {
    @IsDefined({ message: 'A descrição é obrigatória!' })
    @IsString()
    @IsNotEmpty({message: 'A descrição não pode estar vazia!'})
    @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' })
    @MaxLength(60, {message: "A descrição não pode ser maior que 60 caracteres!"})
    descricao: string;
    
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 3 }) 
    @Min(-9999999999.999)
    @Max(9999999999.999)
    custo?: number;
    
    @IsOptional()
    imagem?: Buffer;
}
