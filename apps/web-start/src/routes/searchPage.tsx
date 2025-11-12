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

      const response = await fetch(`https://deldot-team3.onrender.com/complaint/search?${params.toString()}`)
      
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
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
    </div>
  )
}
