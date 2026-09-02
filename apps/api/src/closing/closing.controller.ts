import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { Role } from "@prisma/client";
import {
  CurrentUser,
  Roles,
  userIdOf,
  type SessionUser,
} from "../auth/auth.decorators";
import { CreateClosingDto } from "./closing.dto";
import { ClosingService } from "./closing.service";

@Controller("closings")
export class ClosingController {
  constructor(private readonly closing: ClosingService) {}

  @Get("summary")
  getSummary(@Query("date") date?: string) {
    return this.closing.getSummary(date);
  }

  @Post()
  close(@Body() dto: CreateClosingDto, @CurrentUser() user: SessionUser) {
    return this.closing.close(dto, userIdOf(user));
  }

  // Koreksi administratif, bukan transaksi — jadi dikunci ke admin.
  @Roles(Role.ADMIN)
  @Delete()
  reopen() {
    return this.closing.reopen();
  }
}