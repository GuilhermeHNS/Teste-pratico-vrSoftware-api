import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Get()
  findByFilters(@Query('descricao') description?: string, @Query('custo') custo?: number, @Query('precoVenda') precoVenda?: number) {
    if (description || custo || precoVenda) {
      return this.produtoService.findByFilters(description, custo, precoVenda);
    }
    return this.produtoService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
