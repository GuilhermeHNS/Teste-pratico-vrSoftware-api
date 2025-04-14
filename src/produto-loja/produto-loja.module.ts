import { Module } from '@nestjs/common';
import { ProdutoLojaService } from './produto-loja.service';
import { ProdutoLojaController } from './produto-loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLoja } from './entities/produto-loja.entity';
import { Produto } from '../produto/entities/produto.entity';
import { Loja } from '../loja/entities/loja.entity';
import { ProdutoService } from '../produto/produto.service';
import { LojaService } from '../loja/loja.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProdutoLoja, Produto, Loja])
  ],
  controllers: [ProdutoLojaController],
  providers: [ProdutoLojaService, ProdutoService, LojaService],
})
export class ProdutoLojaModule {}
