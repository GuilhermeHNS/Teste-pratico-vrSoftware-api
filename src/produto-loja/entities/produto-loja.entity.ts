import { Loja } from "../../loja/entities/loja.entity";
import { Produto } from "../../produto/entities/produto.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProdutoLoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'numeric', precision: 13, scale: 3 })
    precoVenda: number;

    @ManyToOne(() => Produto, (produto) => produto.lojas, { onDelete: 'CASCADE' })
    produto: Produto;

    @ManyToOne(() => Loja, (loja) => loja.produtos, { onDelete: 'CASCADE' })
    loja: Loja;
}
