import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module.js';
import { UploadsModule } from './uploads/uploads.module.js';

@Module({
  imports: [ProfileModule,UploadsModule],
})
export class AppModule {}
