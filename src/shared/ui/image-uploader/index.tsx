import React, { useState } from 'react'
import { getPresignedUrl } from './lib/getPresignedUrl'

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      // Запросите предварительно подписанный URL
      const url = await getPresignedUrl(file.name)

      // Загрузите файл по полученному URL
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
      })

      if (uploadResponse.ok) {
        console.log('imageUrl:', uploadResponse.url)
      } else {
        console.error('Error uploading file')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  )
}

export default FileUploader
