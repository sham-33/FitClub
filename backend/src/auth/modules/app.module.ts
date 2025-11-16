import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from '../../config/configuration';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { StepsModule } from '../dto/steps.module';
import { GoogleFitModule } from '../auth/modules/google-fit.module';
import { LeaderboardModule } from './auth/modules/leaderboard.module';
import { SchedulerModule } from './auth/modules/scheduler.module';
import { User } from '../entities/user.entity';
import { StepRecord } from '../dto/step.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [User, StepRecord],
        synchronize: true, // Only for development
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    StepsModule,
    GoogleFitModule,
    LeaderboardModule,
    SchedulerModule,
  ],
})
export class AppModule {}
