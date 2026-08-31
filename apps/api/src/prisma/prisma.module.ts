import { Module } from "@nestjs/common";
import { DashboardController } from "../dashboard/dashboard.controller";
import { DashboardService } from "../dashboard/dashboard.service";

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}