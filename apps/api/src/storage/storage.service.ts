import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { STORAGE_CONFIG } from "../config/storage.config";


export type UploadedImage = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

@Injectable()
export class StorageService {
  private readonly client: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error(
        "SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY belum diisi di .env",
      );
    }

    this.client = createClient(url, key, { auth: { persistSession: false } });
  }

  async uploadMenuImage(file: UploadedImage | undefined) {
    const safe = this.ensureValid(file);

    // Nama file diacak, bukan pakai nama asli dari pengunggah.
    // Nama asli bisa mengandung karakter aneh atau menimpa file lain.
    const path = `${randomUUID()}${extname(safe.originalname).toLowerCase()}`;

    const { error } = await this.client.storage
      .from(STORAGE_CONFIG.bucket)
      .upload(path, safe.buffer, {
        contentType: safe.mimetype,
        upsert: false,
      });

    if (error) {
      throw new InternalServerErrorException("Gagal mengunggah gambar");
    }

    const { data } = this.client.storage
      .from(STORAGE_CONFIG.bucket)
      .getPublicUrl(path);

    return { url: data.publicUrl };
  }

  private ensureValid(file: UploadedImage | undefined) {
    if (!file) {
      throw new BadRequestException("File gambar tidak ditemukan");
    }

    const allowed = STORAGE_CONFIG.allowedTypes as readonly string[];

    if (!allowed.includes(file.mimetype)) {
      throw new BadRequestException("Format harus JPG, PNG, atau WEBP");
    }

    if (file.size > STORAGE_CONFIG.maxSizeBytes) {
      throw new BadRequestException("Ukuran gambar maksimal 2MB");
    }

    return file;
  }
}