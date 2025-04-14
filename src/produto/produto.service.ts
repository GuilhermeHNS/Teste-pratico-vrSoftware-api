import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>
  ) { }

  async create(createProdutoDto: CreateProdutoDto) {
    const produto = this.produtoRepository.create(createProdutoDto);
    return await this.produtoRepository.save(produto);
  }

  async findAll() {
    return await this.produtoRepository.find();
  }

  async findOne(id: number) {
    const produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto) throw new NotFoundException("Produto não encontrado!");
    return produto;
  }

  async findByFilters(codigo?: number, description?: string, custo?: number, precoVenda?: number) {
    const query = this.produtoRepository
      .createQueryBuilder('produto')
      .leftJoin('produto.lojas', 'produtoLoja');

    if (codigo) {
      query.andWhere('produto.id = :codigo', { codigo });
    }

    if (precoVenda) {
      query.andWhere('produtoLoja.precoVenda = :precoVenda', { precoVenda });
    }

    if (description) {
      query.andWhere('produto.descricao ILIKE :descricao', { descricao: `%${description}%` });
    }

    if (custo) {
      query.andWhere('produto.custo = :custo', { custo: custo });
    }

    return await query.getMany();
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.findOne(id);

    if (!produto) throw new NotFoundException();

    this.produtoRepository.merge(produto, updateProdutoDto);

    return await this.produtoRepository.save(produto);
  }

  async remove(id: number) {
    const produto = await this.findOne(id);
    if (!produto) throw new NotFoundException("Produto não encontrado!");

    return await this.produtoRepository.remove(produto);
  }
}
