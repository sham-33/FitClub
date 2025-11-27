import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';
import { StepsModule } from './modules/steps.module';
import { GoogleFitModule } from './modules/google-fit.module';
import { LeaderboardModule } from './modules/leaderboard.module';
import { SchedulerModule } from './modules/scheduler.module';
import { User } from './entities/user.entity';
import { StepRecord } from './entities/step.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, StepRecord],
        synchronize: true,
        ssl: configService.get<string>('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
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
