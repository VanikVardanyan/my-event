import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import s3Config from '@/shared/lib/wasabi'
import { WasabiBackedName } from '../../../types/common'

export async function getPresignedUrl(fileName: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: WasabiBackedName,
    Key: fileName,
  })

  const url = await getSignedUrl(s3Config, command)

  return url
}

export async function deleteImage(fileName: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: WasabiBackedName,
      Key: fileName,
    })

    await s3Config.send(command)
  } catch (error) {
    console.error(`Failed to delete object ${fileName}:`, error)
    throw error
  }
}
