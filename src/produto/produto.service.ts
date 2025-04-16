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

  async findAll(page: number, limit: number) {
    const [data, total] = await this.produtoRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit)
    }
  }

  async findOne(id: number) {
    const produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto) throw new NotFoundException("Produto não encontrado!");
    return produto;
  }

  async findByFilters(page: number, limit: number, codigo?: number, description?: string, custo?: number, precoVenda?: number) {
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

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
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
