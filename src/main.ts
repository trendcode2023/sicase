import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // para que no tome ninguna prodiedad adicional seteda en el dto
      exceptionFactory: (errors) => {
        // para dar otro tipo de salida a los erores
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constrains: error.constraints };
        });
        return new BadRequestException({
          alert: 'se han detectado los siguientes errores:',
          errors: cleanErrors,
        });
      },
    }),
  ); // se declara para que funcione los dtos
  //app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
