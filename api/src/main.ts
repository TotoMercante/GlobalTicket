import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
  });

  const config = new DocumentBuilder()
    .setTitle('App example')
    .setDescription('The app API description')
    .setVersion('1.0')
    .addTag('model')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap().catch(console.error);
