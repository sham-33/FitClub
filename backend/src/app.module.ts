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
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // turn off in production later
        ssl: {
          rejectUnauthorized: false,
        },
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
