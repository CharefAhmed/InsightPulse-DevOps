import { Module } from '@nestjs/common';
import { TerminusModule, HealthIndicatorService } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma.health';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    TerminusModule,
    DatabaseModule,
  ],
  controllers: [HealthController],
  providers: [PrismaHealthIndicator, HealthIndicatorService],
})
export class HealthModule {}
