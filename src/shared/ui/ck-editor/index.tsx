'use client' // only in App Router

import 'ckeditor5/ckeditor5.css'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Underline,
  Strikethrough,
  Link,
  List,
  BlockQuote,
  Heading,
  Table,
} from 'ckeditor5'

const config = {
  toolbar: {
    items: [
      'heading',
      'paragraph',
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'blockQuote',
    ],
  },
  plugins: [
    Bold,
    Heading,
    Essentials,
    Italic,
    Mention,
    Paragraph,
    Undo,
    Underline,
    Strikethrough,
    Link,
    List,
    BlockQuote,
  ],
  initialData: '',
}

interface ICustomEditor {
  descriptionValue: string
  setValue: (name: string, value: string) => void
}

function CustomEditor(props: ICustomEditor) {
  const { descriptionValue, setValue } = props

  return (
    <CKEditor
      editor={ClassicEditor}
      config={config}
      data={descriptionValue}
      onChange={(event, editor) => {
        const data = editor.getData()
        // Устанавливаем значение в форму
        setValue('description', data)
      }}
    />
  )
}

export default CustomEditor
