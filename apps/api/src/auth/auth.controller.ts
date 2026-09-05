import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import type { Request, response, Response } from "express";
import { AUTH_CONFIG } from "../config/auth.config";
import { Public } from "./auth.decorators";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(dto);

    response.cookie(AUTH_CONFIG.cookieName, result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: AUTH_CONFIG.cookieMaxAgeMs,
    });

    return result.user;
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) response: Response) {
      response.clearCookie(AUTH_CONFIG.cookieName, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return { ok:true };
  }

  @Get("me")
  me(@Req() request: Request) {
    const payload = request.user as { sub: string };
    return this.authService.findById(payload.sub);
  }
}