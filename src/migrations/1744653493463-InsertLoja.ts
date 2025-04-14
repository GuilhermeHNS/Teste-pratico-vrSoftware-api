import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertLoja1744653493463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          INSERT INTO loja (descricao) VALUES 
            ('Loja Centro'),
            ('Loja Norte'),
            ('Loja Sul'),
            ('Loja Leste'),
            ('Loja Oeste'),
            ('Loja Shopping');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM loja;`);
    }

}
