import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LojaService } from 'src/loja/loja.service';
import { ProdutoService } from 'src/produto/produto.service';
import { Repository } from 'typeorm';
import { CreateProdutoLojaDto } from './dto/create-produto-loja.dto';
import { UpdateProdutoLojaDto } from './dto/update-produto-loja.dto';
import { ProdutoLoja } from './entities/produto-loja.entity';

@Injectable()
export class ProdutoLojaService {

  constructor(
    @InjectRepository(ProdutoLoja)
    private readonly produtoLojaRepository: Repository<ProdutoLoja>,
    private readonly produtoService: ProdutoService,
    private readonly lojaService: LojaService
  ) { }

  async create(createProdutoLojaDto: CreateProdutoLojaDto) {
    const produto = await this.produtoService.findOne(createProdutoLojaDto.idProduto);
    const loja = await this.lojaService.findOne(createProdutoLojaDto.idLoja);
    if (!produto || !loja) {
      throw new NotFoundException('Produto ou Loja não encontrados');
    }

    const exists = await this.produtoLojaRepository.findOne({
      where: {
        produto: { id: createProdutoLojaDto.idProduto },
        loja: { id: createProdutoLojaDto.idLoja }
      }
    })

    if (exists) {
      throw new BadRequestException('Este produto já está cadastrado para essa loja!');
    }

    const produtoLoja = this.produtoLojaRepository.create({
      produto: produto,
      loja: loja,
      precoVenda: createProdutoLojaDto.precoVenda
    });
    return this.produtoLojaRepository.save(produtoLoja);
  }

  async findAll() {
    return await this.produtoLojaRepository.find();
  }

  async findOne(id: number) {
    const produtoLoja = await this.produtoLojaRepository.findOne({ where: { id } })
    if (!produtoLoja) throw new NotFoundException();
    return produtoLoja;
  }

  async update(id: number, updateProdutoLojaDto: UpdateProdutoLojaDto) {
    const produtoLoja = await this.findOne(id);
    if (!produtoLoja) throw new NotFoundException();
    this.produtoLojaRepository.merge(produtoLoja, updateProdutoLojaDto)
    return await this.produtoLojaRepository.save(produtoLoja);
  }

  async remove(id: number) {
    const produtoLoja = await this.findOne(id);
    if (!produtoLoja) throw new NotFoundException();
    return await this.produtoLojaRepository.delete(produtoLoja);
  }
}
