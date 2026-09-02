import { Module } from "@nestjs/common";
import { ClosingController } from "./closing.controller";
import { ClosingService } from "./closing.service";

@Module({
  controllers: [ClosingController],
  providers: [ClosingService],
})
export class ClosingModule {}