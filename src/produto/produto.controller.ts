import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagem'))
  create(@UploadedFile() file: { buffer: Buffer }, @Body() body: any) {
    const custo = body.custo ? parseFloat(body.custo) : undefined;

    const produtoDto: CreateProdutoDto = {
      descricao: body.descricao,
      custo: custo,
      imagem: file?.buffer
    };
    return this.produtoService.create(produtoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Get()
  findByFilters(@Query('page') page: string, @Query('limit') limit: string, @Query('codigo') codigo?: number, @Query('descricao') description?: string, @Query('custo') custo?: number, @Query('precoVenda') precoVenda?: number) {
    if (codigo || description || custo || precoVenda) {
      return this.produtoService.findByFilters(+page, +limit, codigo, description, custo, precoVenda);
    }
    return this.produtoService.findAll(+page, +limit);
  }

  @Get('/imagem/:id')
  findImagemById(@Param('id') id: string) {
    return this.produtoService.findImageById(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagem'))
  update(@Param('id') id: string, @Body() body: any, @UploadedFile() file?: { buffer: Buffer }) {
    const custo = body.custo ? parseFloat(body.custo) : undefined;
    const updateProduto: UpdateProdutoDto = {
      descricao: body.descricao,
      custo: custo,
      imagem: file?.buffer
    }
    return this.produtoService.update(+id, updateProduto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }

}
