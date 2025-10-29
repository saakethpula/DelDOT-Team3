import axios from 'axios'

// Configure your upload endpoint here. Replace with your backend URL or use an environment variable.
const UPLOAD_URL = (import.meta.env.VITE_UPLOAD_URL) || 'https://httpbin.org/post'

export function uploadFile(file, onProgress) {
  const formData = new FormData()
  formData.append('file', file)

  return axios.post(UPLOAD_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (!event.lengthComputable) return
      const percentCompleted = Math.round((event.loaded * 100) / event.total)
      onProgress && onProgress(percentCompleted)
    }
  }).then(res => res.data)
}
