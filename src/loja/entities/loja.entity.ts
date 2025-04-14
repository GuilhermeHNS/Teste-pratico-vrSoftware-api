import { ProdutoLoja } from "../../produto-loja/entities/produto-loja.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Loja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60, nullable: false})
    descricao: string;

    @OneToMany(() => ProdutoLoja, (ProdutoLoja) => ProdutoLoja.loja)
    produtos: ProdutoLoja[];
}
