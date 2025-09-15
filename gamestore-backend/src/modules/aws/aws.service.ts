import { Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private readonly _client: S3Client;
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this._client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const bucketName = this.configService.get('AWS_STORAGE_BUCKET_NAME');
    const region = this.configService.get('AWS_REGION');
    const encodeFileName = encodeURI(file.originalname);
    const params = {
      Bucket: bucketName,
      Key: `images/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command: PutObjectCommand = new PutObjectCommand(params);
    await this._client.send(command);

    return `https://${bucketName}.s3.${region}.amazonaws.com/images/${encodeFileName}`;
  }
}
