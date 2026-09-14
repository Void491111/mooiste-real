import { Controller, Get, Query } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "../auth/auth.decorators";
import { ReportService } from "./report.service";

@Roles(Role.ADMIN)
@Controller("reports")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReport(@Query("from") from?: string, @Query("to") to?: string) {
    return this.reportService.getReport(from, to);
  }
}