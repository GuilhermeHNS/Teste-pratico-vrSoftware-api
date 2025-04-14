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

  describe('create', () => {
    it('should create a new product', async () => {
      const createDto: CreateProdutoDto = {
        descricao: 'Novo Produto',
        custo: 150.75
      };

      const result = await service.create(createDto);
      
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({
        ...createDto,
        id: expect.any(Number)
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();
      
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockProduto]);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = await service.findOne(1);
      
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockProduto);
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);
      
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByFilters', () => {
    it('should filter products by description', async () => {
      const result = await service.findByFilters('teste');
      
      expect(result).toEqual([mockProduto]);
      expect(repository.createQueryBuilder).toHaveBeenCalled();
    });

    it('should filter products by cost', async () => {
      const result = await service.findByFilters(undefined, 100.50);
      
      expect(result).toEqual([mockProduto]);
      expect(repository.createQueryBuilder).toHaveBeenCalled();
    });

    it('should filter products by sale price', async () => {
      const result = await service.findByFilters(undefined, undefined, 200);
      
      expect(result).toEqual([mockProduto]);
      expect(repository.createQueryBuilder).toHaveBeenCalled();
    });

    it('should return all products when no filters', async () => {
      const result = await service.findByFilters();
      
      expect(result).toEqual([mockProduto]);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateDto: UpdateProdutoDto = {
        descricao: 'Produto Atualizado'
      };

      const result = await service.update(1, updateDto);
      
      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.merge).toHaveBeenCalledWith(mockProduto, updateDto);
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);
      
      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const result = await service.remove(1);
      
      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalled();
      expect(result).toEqual(mockProduto);
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);
      
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

});
