import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProdutoLojaTables1744554088405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
           CREATE TABLE produto (
            id SERIAL PRIMARY KEY,
            descricao VARCHAR(60) NOT NULL,
            custo NUMERIC(13,3) NULL,
            imagem BYTEA
          );

          CREATE TABLE loja (
            id SERIAL PRIMARY KEY,
            descricao VARCHAR(60) NOT NULL
          );

          CREATE TABLE produto_loja (
            id SERIAL PRIMARY KEY,
            idProduto INT NOT NULL,
            idLoja INT NOT NULL,
            precoVenda NUMERIC(13,3),
            CONSTRAINT fk_produto FOREIGN KEY (idProduto) REFERENCES produto(id) ON DELETE CASCADE,
            CONSTRAINT fk_loja FOREIGN KEY (idLoja) REFERENCES loja(id) ON DELETE CASCADE
          ); 
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE produto_loja;`);
        await queryRunner.query(`DROP TABLE loja;`);
        await queryRunner.query(`DROP TABLE produto;`);
    }

}
