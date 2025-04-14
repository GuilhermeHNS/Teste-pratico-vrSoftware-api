import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertProduto1744653563343 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          INSERT INTO produto (descricao, custo, imagem) VALUES 
            ('Mouse Gamer', 59.900, NULL),
            ('Teclado Mecânico RGB', 129.990, NULL),
            ('Monitor 24"', 899.000, NULL),
            ('Headset Bluetooth', 199.500, NULL),
            ('Notebook i5 8GB', 2999.990, NULL),
            ('Cadeira Gamer', 1299.000, NULL),
            ('Webcam HD', 159.900, NULL),
            ('SSD 1TB', 449.990, NULL),
            ('Fonte 600W', 299.990, NULL),
            ('Gabinete RGB', 399.990, NULL);
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM produto;`);
      }

}
