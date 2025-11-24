import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';
import { OcrController } from './ocr/ocr.controller';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { VehicleModule } from './vehicle/vehicle.module';
import { ComplaintModule } from './complaint/complaint.module';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [LinksModule, VehicleModule, ComplaintModule, UserModule, DocumentModule],
  controllers: [OcrController],
  providers: [AppService],
})
export class AppModule {}
