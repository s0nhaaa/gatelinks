import { downloadFile } from '@/helpers/download-file'
import { storage } from '@/libs/firebase'
import { getBlob, ref } from 'firebase/storage'
import { Download } from 'lucide-react'
import { useState } from 'react'

interface DownloadButtonProps {
  id: string
  name: string
}

export default function DownloadButton({ name, id }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false)

  const download = async () => {
    setLoading(true)
    const blob = await getBlob(ref(storage, `contents/${id}`))
    downloadFile(blob, name)
    setLoading(false)
  }

  return (
    <button className='btn btn-primary' onClick={download} disabled={loading}>
      {loading ? (
        <>
          <span className='loading loading-spinner'></span>
          Downloading
        </>
      ) : (
        <>
          <Download size={16} /> Download
        </>
      )}
    </button>
  )
}
