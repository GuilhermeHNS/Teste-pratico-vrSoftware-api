import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProdutoModule } from './produto/produto.module';
import { LojaModule } from './loja/loja.module';
import { ProdutoLojaModule } from './produto-loja/produto-loja.module';
import { ProdutoService } from './produto/produto.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASENAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: configService.get('NODE_ENV') === 'development',
        migrations: ['dist/migrations/*.js'],
        migrationsRun: true
      })
    }),
    ProdutoModule,
    LojaModule,
    ProdutoLojaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
