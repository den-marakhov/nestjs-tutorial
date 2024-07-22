import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  

  const config = new DocumentBuilder()
                .setTitle('NestJS tutorial project api')
                .setDescription('NestJS api description')
                .setVersion('1.0')
                .addTag('API')
                .addTag("Cats")
                .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const validationPipe = app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const port = parseInt(configService.get('port'));
  await app.listen(port);

}
bootstrap();
