import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from './presentation.module';

@Module({
  imports: [ConfigModule.forRoot(), PresentationModule],
})
export class RootModule {}
