import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Repository } from 'typeorm';
import { Loja } from './entities/loja.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LojaService {

  constructor(
    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>
  ) { }

  async create(createLojaDto: CreateLojaDto) {
    const loja = this.lojaRepository.create(createLojaDto);
    return await this.lojaRepository.save(loja);
  }

  async findAll() {
    return await this.lojaRepository.find();
  }

  async findOne(id: number) {
    return await this.lojaRepository.findOne({ where: { id } });
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {

    const loja = await this.findOne(id);

    if (!loja) throw new NotFoundException();

    this.lojaRepository.merge(loja, updateLojaDto);

    return await this.lojaRepository.save(loja);
  }

  async remove(id: number) {
    const loja = await this.findOne(id);

    if (!loja) throw new NotFoundException();

    return await this.lojaRepository.remove(loja);
  }
}
