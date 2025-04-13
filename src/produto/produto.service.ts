import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

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
    if (!produto) throw new NotFoundException();
    return produto;
  }

  async findByFilters(description?: string, custo?: number, precoVenda?: number) {
    const query = this.produtoRepository
      .createQueryBuilder('produto')
      .leftJoin('produto.lojas', 'produtoLoja');

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
    if (!produto) throw new NotFoundException();

    return await this.produtoRepository.remove(produto);
  }
}
