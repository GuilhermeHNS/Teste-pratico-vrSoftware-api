import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoLojaService } from './produto-loja.service';

describe('ProdutoLojaService', () => {
  let service: ProdutoLojaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoLojaService],
    }).compile();

    service = module.get<ProdutoLojaService>(ProdutoLojaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
