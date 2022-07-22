import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppRoutingModule } from './app-routing.module';
import { SuccessInterceptor } from './shared/interceptors/success.interceptor';

@Module({
  imports: [
    AppRoutingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
  ],
})
export class AppModule {}
