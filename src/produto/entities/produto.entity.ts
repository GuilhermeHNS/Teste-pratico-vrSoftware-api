import { ProdutoLoja } from "../../produto-loja/entities/produto-loja.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60, nullable: false})
    descricao: string;

    @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true})
    custo: number;

    @Column({ type: 'bytea', nullable: true })
    imagem: Buffer;

    @OneToMany(() => ProdutoLoja, (produtoLoja) => produtoLoja.produto)
    lojas: ProdutoLoja[];
}
