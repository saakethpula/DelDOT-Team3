import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { uploadFile } from './api/upload'

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [progress, setProgress] = useState({})

  const mutation = useMutation(({ file }) => uploadFile(file, (p) => {
    setProgress((prev) => ({ ...prev, [file.name]: p }))
  }))

  function onFilesChange(e) {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)
    setProgress({})
  }

  function uploadAll() {
    selectedFiles.forEach((file) => {
      mutation.mutate({ file })
    })
  }

  return (
    <div className="container">
      <h1>DelDOT — Upload Starter (TanStack)</h1>

      <div className="card">
        <input id="file" type="file" multiple onChange={onFilesChange} />

        {selectedFiles.length > 0 && (
          <div>
            <h3>Files to upload</h3>
            <ul>
              {selectedFiles.map((f) => (
                <li key={f.name} className="file-row">
                  <span className="filename">{f.name}</span>
                  <span className="size">{(f.size / 1024).toFixed(1)} KB</span>
                  <progress value={progress[f.name] || 0} max="100"></progress>
                  <span className="pct">{progress[f.name] ? `${progress[f.name]}%` : ''}</span>
                </li>
              ))}
            </ul>
            <div className="actions">
              <button onClick={uploadAll} disabled={mutation.isLoading}>Upload all</button>
              {mutation.isError && <div className="error">Upload failed: {mutation.error?.message}</div>}
              {mutation.isSuccess && <div className="success">Last upload succeeded</div>}
            </div>
          </div>
        )}

        <div className="note">
          This sample uploads files to the URL configured in <code>src/api/upload.js</code> (default: https://httpbin.org/post). Replace it with your backend endpoint.
        </div>
      </div>
    </div>
  )
}
