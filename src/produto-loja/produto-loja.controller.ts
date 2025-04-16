import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProdutoLojaDto } from './dto/create-produto-loja.dto';
import { UpdateProdutoLojaDto } from './dto/update-produto-loja.dto';
import { ProdutoLojaService } from './produto-loja.service';

@Controller('produto-loja')
export class ProdutoLojaController {
  constructor(private readonly produtoLojaService: ProdutoLojaService) { }

  @Post()
  create(@Body() createProdutoLojaDto: CreateProdutoLojaDto) {
    return this.produtoLojaService.create(createProdutoLojaDto);
  }

  @Get()
  findAll() {
    return this.produtoLojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoLojaService.findOne(+id);
  }

  @Get('/produto/:id')
  findByIdProduto(@Param('id') id: string, @Query("page") page: string, @Query("limit") limit: string) {
    return this.produtoLojaService.findByIdProduto(+id, +page, +limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoLojaDto: UpdateProdutoLojaDto) {
    return this.produtoLojaService.update(+id, updateProdutoLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoLojaService.remove(+id);
  }

}
