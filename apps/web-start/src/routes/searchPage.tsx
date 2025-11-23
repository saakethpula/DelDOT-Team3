import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/searchPage')({
  component: RouteComponent,
})

interface Complaint {
  id: string
  caseNumber: string | null
  customerName: string
  customerEmail: string | null
  customerPhone: string | null
  respondentName: string | null
  status: string
  complaintType: string | null
  dateReceived: string | null
  investigator: string | null
  vehicle?: {
    id: string
    vin: string | null
    make: string | null
    model: string | null
    year: number | null
  } | null
  documents?: Array<{
    id: string
    fileName: string
    fileUrl?: string
  }>
}

interface SearchFilters {
  caseNumber: string
  customerName: string
  customerEmail: string
  respondentName: string
  status: string
  investigator: string
  complaintType: string
  dateReceivedFrom: string
  dateReceivedTo: string
}

function RouteComponent() {
  const [complaints, setComplaints] = useState<Array<Complaint>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<Complaint>>({})
  const [filters, setFilters] = useState<SearchFilters>({
    caseNumber: '',
    customerName: '',
    customerEmail: '',
    respondentName: '',
    status: '',
    investigator: '',
    complaintType: '',
    dateReceivedFrom: '',
    dateReceivedTo: '',
  })

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Build query params from non-empty filters
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value)
        }
      })

      const backendUrl = (import.meta.env.VITE_BACKEND_URL as string) || 'https://deldot-team3.onrender.com'
      const base = backendUrl.replace(/\/$/, '')
      const response = await fetch(`${base}/complaint/search?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch complaints')
      }
      
      const data = await response.json()
      setComplaints(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFilters({
      caseNumber: '',
      customerName: '',
      customerEmail: '',
      respondentName: '',
      status: '',
      investigator: '',
      complaintType: '',
      dateReceivedFrom: '',
      dateReceivedTo: '',
    })
    setComplaints([])
  }

  // Load all complaints on initial render
  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Search Complaints</h1>
      
      {/* Search Filters */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '15px' }}>Filters</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Case Number
            </label>
            <input
              type="text"
              value={filters.caseNumber}
              onChange={(e) => setFilters({ ...filters, caseNumber: e.target.value })}
              placeholder="Enter case number"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Customer Name
            </label>
            <input
              type="text"
              value={filters.customerName}
              onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
              placeholder="Enter customer name"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Customer Email
            </label>
            <input
              type="email"
              value={filters.customerEmail}
              onChange={(e) => setFilters({ ...filters, customerEmail: e.target.value })}
              placeholder="Enter email"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Respondent Name
            </label>
            <input
              type="text"
              value={filters.respondentName}
              onChange={(e) => setFilters({ ...filters, respondentName: e.target.value })}
              placeholder="Enter respondent name"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="INVESTIGATING">Investigating</option>
              <option value="CLOSED">Closed</option>
              <option value="REFERRED">Referred</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Investigator
            </label>
            <input
              type="text"
              value={filters.investigator}
              onChange={(e) => setFilters({ ...filters, investigator: e.target.value })}
              placeholder="Enter investigator"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Complaint Type
            </label>
            <input
              type="text"
              value={filters.complaintType}
              onChange={(e) => setFilters({ ...filters, complaintType: e.target.value })}
              placeholder="Enter complaint type"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Date Received From
            </label>
            <input
              type="date"
              value={filters.dateReceivedFrom}
              onChange={(e) => setFilters({ ...filters, dateReceivedFrom: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Date Received To
            </label>
            <input
              type="date"
              value={filters.dateReceivedTo}
              onChange={(e) => setFilters({ ...filters, dateReceivedTo: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '500'
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          
          <button
            onClick={handleReset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {/* Results */}
      <div>
        <h2 style={{ marginBottom: '15px' }}>
          Results {complaints.length > 0 && `(${complaints.length})`}
        </h2>
        
        {complaints.length === 0 && !loading && (
          <p style={{ color: '#666' }}>No complaints found. Try adjusting your filters.</p>
        )}

        <div style={{ display: 'grid', gap: '15px' }}>
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => openComplaintDetails(complaint.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openComplaintDetails(complaint.id) }}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }}
              >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>
                    {complaint.caseNumber || 'No Case Number'}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: 
                      complaint.status === 'NEW' ? '#e7f5ff' :
                      complaint.status === 'UNDER_REVIEW' ? '#fff3cd' :
                      complaint.status === 'INVESTIGATING' ? '#cfe2ff' :
                      complaint.status === 'CLOSED' ? '#d1e7dd' :
                      '#f8d7da',
                    color: 
                      complaint.status === 'NEW' ? '#0c5460' :
                      complaint.status === 'UNDER_REVIEW' ? '#856404' :
                      complaint.status === 'INVESTIGATING' ? '#084298' :
                      complaint.status === 'CLOSED' ? '#0f5132' :
                      '#721c24'
                  }}>
                    {complaint.status.replace('_', ' ')}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {complaint.dateReceived && new Date(complaint.dateReceived).toLocaleDateString()}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <strong>Customer:</strong> {complaint.customerName}
                  {complaint.customerEmail && (
                    <div style={{ fontSize: '14px', color: '#666' }}>{complaint.customerEmail}</div>
                  )}
                  {complaint.customerPhone && (
                    <div style={{ fontSize: '14px', color: '#666' }}>{complaint.customerPhone}</div>
                  )}
                </div>
                
                {complaint.respondentName && (
                  <div>
                    <strong>Respondent:</strong> {complaint.respondentName}
                  </div>
                )}
              </div>

              {complaint.complaintType && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Type:</strong> {complaint.complaintType}
                </div>
              )}

              {complaint.investigator && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Investigator:</strong> {complaint.investigator}
                </div>
              )}

              {complaint.vehicle && (
                <div style={{ 
                  marginTop: '15px', 
                  padding: '10px', 
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px'
                }}>
                  <strong>Vehicle:</strong> {complaint.vehicle.year} {complaint.vehicle.make} {complaint.vehicle.model}
                  {complaint.vehicle.vin && (
                    <div style={{ fontSize: '14px', color: '#666' }}>VIN: {complaint.vehicle.vin}</div>
                  )}
                </div>
              )}

              {complaint.documents && complaint.documents.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Documents:</strong> {complaint.documents.length} file(s)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => { setIsModalOpen(false); setSelectedComplaint(null) }}
        >
          <div
            style={{
              width: '90%',
              maxWidth: '900px',
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxHeight: '90%',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>{selectedComplaint?.caseNumber || 'Complaint Details'}</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                {!isEditing ? (
                  <button
                    onClick={() => { setIsEditing(true); setEditData(selectedComplaint || {}) }}
                    style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#28a745', color: 'white', cursor: 'pointer' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setIsEditing(false); setEditData({}) }}
                      style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#dc3545', color: 'white', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={() => { setIsModalOpen(false); setSelectedComplaint(null); setIsEditing(false); setEditData({}) }}
                  style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#6c757d', color: 'white', cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>

            {detailLoading && <p>Loading details...</p>}

            {!detailLoading && selectedComplaint && (
              <div style={{ marginTop: 15 }}>
                <div style={{ marginBottom: 10 }}>
                  <strong>Customer Name:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.customerName || ''}
                      onChange={(e) => setEditData({ ...editData, customerName: e.target.value })}
                      style={{ width: '100%', padding: '6px', marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                  ) : (
                    <span> {selectedComplaint.customerName}</span>
                  )}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <strong>Email:</strong>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.customerEmail || ''}
                      onChange={(e) => setEditData({ ...editData, customerEmail: e.target.value })}
                      style={{ width: '100%', padding: '6px', marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                  ) : (
                    <span> {selectedComplaint.customerEmail || 'N/A'}</span>
                  )}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <strong>Phone:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.customerPhone || ''}
                      onChange={(e) => setEditData({ ...editData, customerPhone: e.target.value })}
                      style={{ width: '100%', padding: '6px', marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                  ) : (
                    <span> {selectedComplaint.customerPhone || 'N/A'}</span>
                  )}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <strong>Respondent:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.respondentName || ''}
                      onChange={(e) => setEditData({ ...editData, respondentName: e.target.value })}
                      style={{ width: '100%', padding: '6px', marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                  ) : (
                    <span> {selectedComplaint.respondentName || 'N/A'}</span>
                  )}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <strong>Type:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.complaintType || ''}
                      onChange={(e) => setEditData({ ...editData, complaintType: e.target.value })}
                      style={{ width: '100%', padding: '6px', marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                  ) : (
                    <span> {selectedComplaint.complaintType || 'N/A'}</span>
                  )}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <strong>Investigator:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.investigator || ''}
                      onChange={(e) => setEditData({ ...editData, investigator: e.target.value })}
                      style={{ width: '100%', padding: '6px', marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                  ) : (
                    <span> {selectedComplaint.investigator || 'N/A'}</span>
                  )}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <strong>Status:</strong>
                  {isEditing ? (
                    <select
                      value={editData.status || ''}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      style={{ width: '100%', padding: '6px', marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                    >
                      <option value="NEW">New</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="INVESTIGATING">Investigating</option>
                      <option value="CLOSED">Closed</option>
                      <option value="REFERRED">Referred</option>
                    </select>
                  ) : (
                    <span> {selectedComplaint.status}</span>
                  )}
                </div>
                {selectedComplaint.vehicle && (
                  <div style={{ marginTop: 10, padding: 10, background: '#f8f9fa', borderRadius: 6 }}>
                    <strong>Vehicle</strong>
                    <div>{selectedComplaint.vehicle.year} {selectedComplaint.vehicle.make} {selectedComplaint.vehicle.model}</div>
                    {selectedComplaint.vehicle.vin && <div>VIN: {selectedComplaint.vehicle.vin}</div>}
                  </div>
                )}

                <div style={{ marginTop: 15 }}>
                  <strong>Documents</strong>
                  {selectedComplaint.documents && selectedComplaint.documents.length > 0 ? (
                    <ul>
                      {selectedComplaint.documents.map((doc) => (
                        <li key={doc.id} style={{ marginBottom: 8 }}>
                          <span style={{ marginRight: 12 }}>{doc.fileName}</span>
                          {doc.fileUrl ? (
                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>View</a>
                          ) : (
                            <span style={{ color: '#6c757d' }}>No file URL</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: '#666', marginTop: 8 }}>No documents attached.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )

  async function handleSaveEdit() {
    if (!selectedComplaint?.id) return
    
    try {
      const backendUrl = (import.meta.env.VITE_BACKEND_URL as string)
      const base = backendUrl.replace(/\/$/, '')
      const response = await fetch(`${base}/complaint/${selectedComplaint.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      })
      
      if (!response.ok) throw new Error('Failed to update complaint')
      
      const updated = await response.json()
      setSelectedComplaint(updated)
      setIsEditing(false)
      setEditData({})
      
      // Refresh the list
      handleSearch()
      alert('Complaint updated successfully!')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update')
    }
  }

  async function openComplaintDetails(id: string) {
    setDetailLoading(true)
    setIsModalOpen(true)
    setSelectedComplaint(null)
    try {
      const backendUrl = (import.meta.env.VITE_BACKEND_URL as string)
      const base = backendUrl.replace(/\/$/, '')
      const res = await fetch(`${base}/complaint/${id}`)
      if (!res.ok) throw new Error('Failed to load complaint details')
      const data = await res.json()
      setSelectedComplaint(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load details')
    } finally {
      setDetailLoading(false)
    }
  }
}