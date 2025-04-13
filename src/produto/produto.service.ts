import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    return await this.produtoRepository.findOne({ where: { id } });
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
