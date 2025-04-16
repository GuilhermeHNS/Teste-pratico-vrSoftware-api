import { Loja } from "../../loja/entities/loja.entity";
import { Produto } from "../../produto/entities/produto.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProdutoLoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'numeric', precision: 13, scale: 3 })
    precoVenda: number;

    @ManyToOne(() => Produto, (produto) => produto.lojas, { onDelete: 'CASCADE' })
    @JoinColumn({name: "idproduto"})
    produto: Produto;

    @ManyToOne(() => Loja, (loja) => loja.produtos, { onDelete: 'CASCADE' })
    @JoinColumn({name: "idloja"})
    loja: Loja;
}
