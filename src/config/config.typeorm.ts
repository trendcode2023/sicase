import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.development' });

const config = {
  type: 'mssql',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  //port: process.env.DB_PORT as unknown as number,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true, //Carga automáticamente las entidades definidas en el proyecto sin necesidad de especificarlas manualmente. entities: [User, Todo],
  synchronize: true, //Sincroniza automáticamente la base de datos con las entidades en cada inicio (útil en desarrollo, pero en producción debe ser false).
  logging: true, // Habilita el registro de las consultas SQL y las operaciones realizadas en la base de datos para depuración.
  dropSchema: true, // Borra todas las tablas de la base de datos al iniciar la aplicación (normalmente se usa en desarrollo, pero debe ser false en producción).
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  options: {
    encrypt: true, // Cifrado de conexión para SQL Server
    trustServerCertificate: true, // Permite certificados autofirmados, útil con Docker
  },
};

export default registerAs('typeorm', () => config); //registerAs es una función de @nestjs/config que se utiliza para registrar configuraciones de manera modular y con un identificador único (en este caso, 'typeorm').

export const connectionSource = new DataSource(config as DataSourceOptions); //DataSource es una clase de TypeORM que gestiona la conexión con la base de datos y proporciona métodos para interactuar con ella (como ejecutar migraciones).
