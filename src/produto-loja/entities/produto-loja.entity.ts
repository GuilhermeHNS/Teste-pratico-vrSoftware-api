import { Loja } from "src/loja/entities/loja.entity";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProdutoLoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'numeric', precision: 13, scale: 3})
    precoVenda: number;

    @ManyToOne(() => Produto, (produto) => produto.lojas)
    produto: Produto;

    @ManyToOne(() => Loja, (loja) => loja.produtos)
    loja: Loja;
}
