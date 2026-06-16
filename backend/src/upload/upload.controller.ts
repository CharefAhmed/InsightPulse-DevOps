import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PassportJwtGuard } from 'src/auth/guards/passport-jwt.guard';

@UseGuards(PassportJwtGuard)
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService:UploadService){}
    @Post('preview')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file:Express.Multer.File){
        return this.uploadService.processFile(file);
    }
}
