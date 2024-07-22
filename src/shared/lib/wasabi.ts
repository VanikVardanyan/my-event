import { S3Client } from '@aws-sdk/client-s3'

const wasabi = new S3Client({
  endpoint: 'https://s3.us-east-1.wasabisys.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'TDZKBEAU5AXFT7MQCO43',
    secretAccessKey: 'ckeBGpkeWgRinwT60Rzmz8g5wo0imyyNisPcjKzC',
  },
  forcePathStyle: true, // Заставляет использовать путь-стиль для совместимости с Wasabi
})

export default wasabi
