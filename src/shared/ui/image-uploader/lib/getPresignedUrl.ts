import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  endpoint: 'https://s3.us-east-1.wasabisys.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'TDZKBEAU5AXFT7MQCO43',
    secretAccessKey: 'ckeBGpkeWgRinwT60Rzmz8g5wo0imyyNisPcjKzC',
  },
  forcePathStyle: true, // Заставляет использовать путь-стиль для совместимости с Wasabi
})

export async function getPresignedUrl(fileName: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: 'van-event', // Укажите название вашего бакета
    Key: fileName,
  })

  const url = await getSignedUrl(s3, command)

  return url
}

export async function deleteImage(fileName: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: 'van-event', // Укажите название вашего бакета
      Key: fileName,
    })

    await s3.send(command)
  } catch (error) {
    console.error(`Failed to delete object ${fileName}:`, error)
    throw error // Пробросить ошибку, если нужно
  }
}
