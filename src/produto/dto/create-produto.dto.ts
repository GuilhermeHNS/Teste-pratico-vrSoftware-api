import { IsDefined, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProdutoDto {
    @IsDefined({ message: 'A descrição é obrigatória!' })
    @IsString()
    @IsNotEmpty({message: 'A descrição não pode estar vazia!'})
    @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' })
    @MaxLength(60, {message: "A descrição não pode ser maior que 60 caracteres!"})
    descricao: string;
    
    custo: number;
    
    @IsOptional()
    imagem?: Buffer;
}
