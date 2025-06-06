import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LojaModule } from './loja/loja.module';
import { ProdutoLojaModule } from './produto-loja/produto-loja.module';
import { ProdutoModule } from './produto/produto.module';

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
        synchronize: false,
        entities: [`${__dirname}/**/*.entity{.js, .ts}`],
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
