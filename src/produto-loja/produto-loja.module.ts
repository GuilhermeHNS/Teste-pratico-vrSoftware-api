import { Module } from '@nestjs/common';
import { ProdutoLojaService } from './produto-loja.service';
import { ProdutoLojaController } from './produto-loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLoja } from './entities/produto-loja.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProdutoLoja, Produto, Loja])
  ],
  controllers: [ProdutoLojaController],
  providers: [ProdutoLojaService],
})
export class ProdutoLojaModule {}
