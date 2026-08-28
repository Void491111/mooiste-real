import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AUTH_CONFIG } from "../config/auth.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: AUTH_CONFIG.tokenTtl },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}