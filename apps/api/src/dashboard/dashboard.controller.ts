import { Controller, Get, Query } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "../auth/auth.decorators";
import { clampDays } from "./dashboard.range";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Roles(Role.ADMIN)
  @Get("summary")
  getSummary(@Query("days") days?: string) {
    return this.dashboard.getSummary(clampDays(days));
  }
}