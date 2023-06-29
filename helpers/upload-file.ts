import { storage } from '@/libs/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const uploadFile = async (file: File, path: string) => {
  if (!file) return

  const storageRef = ref(storage, path)

  try {
    await uploadBytes(storageRef, file)
    console.log('Uploaded a blob or file!')

    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL
  } catch (error) {
    console.log('Upload failed: ', error)
  }
}
