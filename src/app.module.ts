import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module'; // ✅ Add this line
import { User } from './entities/User';
import { Doctor } from './entities/Doctor'; // ✅ Add if not already

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Doctor], // ✅ Include Doctor entity
      synchronize: true,
    }),
    AuthModule,
    DoctorsModule, // ✅ Register here
  ],
})
export class AppModule {}
