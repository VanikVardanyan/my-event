import { S3Client } from '@aws-sdk/client-s3'

const endpoint = process.env.NEXT_PUBLIC_WASABI_ENDPOINT
const region = process.env.NEXT_PUBLIC_WASABI_REGION
const accessKeyId = process.env.NEXT_PUBLIC_WASABI_ACCESS_KEY_ID
const secretAccessKey = process.env.NEXT_PUBLIC_WASABI_SECRET_ACCESS_KEY

if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
  throw new Error('Wasabi configuration is incomplete.')
}

const wasabi = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true, // Заставляет использовать путь-стиль для совместимости с Wasabi
})

export default wasabi
