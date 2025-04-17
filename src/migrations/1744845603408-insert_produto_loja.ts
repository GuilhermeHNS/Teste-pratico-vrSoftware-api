import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertProdutoLoja1744845603408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const produtos = await queryRunner.query(`SELECT id FROM produto`);
        const lojas = await queryRunner.query(`SELECT id FROM loja`);

        const inserts = [];
        for (let i = 0; i < produtos.length; i++) {
            const produtoId = produtos[i].id;
            for(let j = 0; j < lojas.length; j++) {
                const lojaId = lojas[j].id;
                const preco = 50 + (Math.random() * 300);
    
                inserts.push(`(${produtoId}, ${lojaId}, ${preco.toFixed(2)})`);
            }
        }

        await queryRunner.query(`
            INSERT INTO produto_loja (idproduto, idloja, precovenda) VALUES 
            ${inserts.join(",")}
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM produto_loja 
        `);
    }


}
