import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let repository: Repository<Produto>;

  const mockProduto = {
    id: 1,
    descricao: 'Produto Teste',
    custo: 100.50,
    lojas: []
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: getRepositoryToken(Produto),
          useValue: {
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockImplementation(produto => Promise.resolve({ ...produto, id: 1 })),
            find: jest.fn().mockResolvedValue([mockProduto]),
            findOne: jest.fn().mockResolvedValue(mockProduto),
            createQueryBuilder: jest.fn(() => ({
              leftJoin: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([mockProduto])
            })),
            merge: jest.fn().mockImplementation((entity, dto) => ({ ...entity, ...dto })),
            remove: jest.fn().mockResolvedValue(mockProduto)
          }
        }
      ]
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
    repository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
