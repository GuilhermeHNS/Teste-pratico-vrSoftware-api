import { ProdutoLoja } from "src/produto-loja/entities/produto-loja.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60, nullable: false})
    descricao: string;

    @Column({ type: 'numeric', precision: 13, scale: 3})
    custo: number;

    @Column({ type: 'bytea', nullable: true })
    imagem: Buffer;

    @OneToMany(() => ProdutoLoja, (produtoLoja) => produtoLoja.produto)
    lojas: ProdutoLoja[];
}
