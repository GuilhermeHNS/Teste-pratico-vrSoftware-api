import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoLojaController } from './produto-loja.controller';
import { ProdutoLojaService } from './produto-loja.service';

describe('ProdutoLojaController', () => {
  let controller: ProdutoLojaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoLojaController],
      providers: [ProdutoLojaService],
    }).compile();

    controller = module.get<ProdutoLojaController>(ProdutoLojaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
