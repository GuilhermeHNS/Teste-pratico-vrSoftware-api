import { IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateProdutoLojaDto {
    @IsInt({ message: 'ID do produto deve ser um número inteiro' })
    @IsPositive({ message: 'ID do produto deve ser positivo' })
    idProduto: number;
  
    @IsInt({ message: 'ID da loja deve ser um número inteiro' })
    @IsPositive({ message: 'ID da loja deve ser positivo' })
    idLoja: number;
  
    @IsNumber({}, { message: 'Preço de venda deve ser um número' })
    @IsPositive({ message: 'Preço de venda deve ser positivo' })
    precoVenda: number;
}
