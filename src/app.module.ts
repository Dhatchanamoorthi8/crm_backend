import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance/attendance.module';
import { ClientModule } from './client/client.module';
import { ClientVistModule } from './client_vist/client_vist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance/entities/attendance.entity';
import { Client } from './client/entities/client.entity';
import { ClientVist } from './client_vist/entities/client_vist.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ServicesOfferModule } from './services_offer/services_offer.module';
import { ServicesOffer } from './services_offer/entities/services_offer.entity';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'root',
      database: 'DevVingroCrm',
      entities: [User, Attendance, Client, ClientVist, ServicesOffer],
      synchronize: true,
      extra: {
        trustServerCertificate: true,  // Disable SSL certificate validation
      },
    }),
    TypeOrmModule.forFeature([User, Attendance, Client, ClientVist, ServicesOffer]),
    ClientModule,
    ClientVistModule,
    UsersModule,
    AuthModule,
    ServicesOfferModule,
    DashboardModule,
    AttendanceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }