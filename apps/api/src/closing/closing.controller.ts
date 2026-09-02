import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import {
  CurrentUser,
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
}