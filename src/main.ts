import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RootModule } from 'src/di/root.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Loomi-ecom')
    .setDescription('API used for testing purpose')
    .setVersion('1.0.0')
    .setBasePath('api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const app = await NestFactory.create(RootModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.LOCAL_HOST || 3000);
}
bootstrap();
