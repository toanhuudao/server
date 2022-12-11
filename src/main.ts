import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClientOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'users', // ['hero', 'hero2']
      protoPath: join(__dirname, './users/users.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
      url: 'localhost:5000',
    },
  };
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
