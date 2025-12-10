import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { JobsModule } from './jobs/jobs.module';
import { QuotesModule } from './quotes/quotes.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { MessagingModule } from './messaging/messaging.module';
import { PaymentsModule } from './payments/payments.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    VehiclesModule,
    JobsModule,
    QuotesModule,
    SuppliersModule,
    MessagingModule,
    PaymentsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
