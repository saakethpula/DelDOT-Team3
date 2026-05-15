import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

interface ComplaintFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  respondentName: string;
  respondentPhone: string;
  respondentAddress: string;
  respondentCity: string;
  respondentState: string;
  respondentZip: string;
  dealershipRep: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  color: string;
  plateNumber: string;
  plateOrUtitle: string;
  complaintType: string;
  explainComplaint: string;
  signatureConfirmed: boolean;
}

const emptyFormData: ComplaintFormData = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerAddress: '',
  customerCity: '',
  customerState: '',
  customerZip: '',
  respondentName: '',
  respondentPhone: '',
  respondentAddress: '',
  respondentCity: '',
  respondentState: '',
  respondentZip: '',
  dealershipRep: '',
  vin: '',
  year: '',
  make: '',
  model: '',
  color: '',
  plateNumber: '',
  plateOrUtitle: '',
  complaintType: '',
  explainComplaint: '',
  signatureConfirmed: false,
};

export const Route = createFileRoute('/complaintForm')({
  component: ComplaintForm,
});

function getBackendBaseUrl() {
  const backendUrl = (import.meta.env as { VITE_BACKEND_URL?: string }).VITE_BACKEND_URL;
  if (!backendUrl) {
    throw new Error('VITE_BACKEND_URL is not configured');
  }
  return backendUrl.replace(/\/$/, '');
}

function ComplaintForm() {
  const pioneerBlue = '#00415B';
  const gold = '#EAD788';
  const lightGray = '#F7F7F7';

  const [formData, setFormData] = useState<ComplaintFormData>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('complaint_form_data') : null;
    return saved ? JSON.parse(saved) : emptyFormData;
  });
  const [submittedData, setSubmittedData] = useState<ComplaintFormData | null>(null);
  const [caseNumber, setCaseNumber] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('complaint_form_data', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const mapTextToForm = async (text: string) => {
    const backend = getBackendBaseUrl();
    const response = await fetch(`${backend}/ocr/map`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to map uploaded PDF text');
    }

    const mappedData = await response.json();
    setFormData((prev) => {
      const updated = { ...prev };

      for (const key in mappedData) {
        const value = mappedData[key as keyof typeof mappedData];
        if (value && String(value).trim() !== '') {
          updated[key as keyof ComplaintFormData] = value;
        }
      }

      return updated;
    });
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadStatus('Please upload a PDF file.');
      e.target.value = '';
      return;
    }

    try {
      setUploadStatus('Reading PDF and filling the form...');
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str);
        fullText += `${strings.join(' ')}\n`;
      }

      await mapTextToForm(fullText);
      setUploadStatus('PDF uploaded and form fields were auto-filled. Please review them before submitting.');
    } catch (error) {
      console.error('Error processing PDF upload:', error);
      setUploadStatus('PDF upload failed. Please try again or complete the form manually.');
    } finally {
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.signatureConfirmed) {
      alert('Please check the E-sign confirmation before submitting.');
      return;
    }

    try {
      const backend = getBackendBaseUrl();
      const response = await fetch(`${backend}/complaint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Failed to submit: ${response.status}`);

      const result = await response.json();
      setSubmittedData(formData);
      setCaseNumber(result.caseNumber || null);
      localStorage.removeItem('complaint_form_data');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  const sectionTitle = {
    backgroundColor: gold,
    color: pioneerBlue,
    padding: '8px 12px',
    borderRadius: '4px',
    marginTop: '20px',
  };

  const labelStyle = { display: 'block', marginBottom: '10px' };
  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '5px 0 15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
  };

  const renderText = (label: string, name: keyof ComplaintFormData) => (
    <label style={labelStyle}>
      {label}
      <input
        type="text"
        name={name}
        value={String(formData[name] ?? '')}
        onChange={handleChange}
        style={inputStyle}
        required={name === 'customerName'}
      />
    </label>
  );

  const renderTextarea = (label: string, name: keyof ComplaintFormData) => (
    <label style={labelStyle}>
      {label}
      <textarea
        name={name}
        value={String(formData[name] ?? '')}
        onChange={handleChange}
        rows={5}
        style={inputStyle}
      />
    </label>
  );

  const summarySections = [
    {
      title: 'Customer Information',
      fields: [
        ['Full Name', 'customerName'],
        ['Phone', 'customerPhone'],
        ['Email', 'customerEmail'],
        ['Address', 'customerAddress'],
        ['City', 'customerCity'],
        ['State', 'customerState'],
        ['Zip', 'customerZip'],
      ],
    },
    {
      title: 'Business or Individual Being Complained Against',
      fields: [
        ['Name', 'respondentName'],
        ['Phone', 'respondentPhone'],
        ['Address', 'respondentAddress'],
        ['City', 'respondentCity'],
        ['State', 'respondentState'],
        ['Zip', 'respondentZip'],
        ['Dealership Representative', 'dealershipRep'],
      ],
    },
    {
      title: 'Vehicle Information',
      fields: [
        ['VIN', 'vin'],
        ['Year', 'year'],
        ['Make', 'make'],
        ['Model', 'model'],
        ['Color', 'color'],
        ['Plate Number', 'plateNumber'],
        ['Plate or U-Title', 'plateOrUtitle'],
      ],
    },
    {
      title: 'Complaint Details',
      fields: [
        ['Complaint Type', 'complaintType'],
        ['Explain Complaint', 'explainComplaint'],
      ],
    },
  ] as const;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: lightGray, minHeight: '100vh', padding: '20px' }}>
      <header
        style={{
          backgroundColor: pioneerBlue,
          color: 'white',
          padding: '15px 20px',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ margin: 0 }}>Delaware DMV Complaint Form</h2>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {!submittedData ? (
          <>
            <div
              style={{
                border: `1px solid ${gold}`,
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: lightGray,
                marginBottom: '20px',
              }}
            >
              <label style={{ display: 'block', fontWeight: 600, color: pioneerBlue, marginBottom: '8px' }}>
                Upload complaint PDF to auto-fill the form
              </label>
              <label
                htmlFor="complaint-pdf-upload"
                style={{
                  display: 'inline-block',
                  backgroundColor: gold,
                  color: pioneerBlue,
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Upload PDF
              </label>
              <input
                id="complaint-pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                style={{ display: 'none' }}
              />
              {uploadStatus && <p style={{ marginBottom: 0 }}>{uploadStatus}</p>}
            </div>

            <h3 style={sectionTitle}>Customer Information</h3>
            {renderText('Full Name', 'customerName')}
            {renderText('Phone', 'customerPhone')}
            {renderText('Email', 'customerEmail')}
            {renderText('Address', 'customerAddress')}
            {renderText('City', 'customerCity')}
            {renderText('State', 'customerState')}
            {renderText('Zip', 'customerZip')}

            <h3 style={sectionTitle}>Business or Individual Being Complained Against</h3>
            {renderText('Name', 'respondentName')}
            {renderText('Phone', 'respondentPhone')}
            {renderText('Address', 'respondentAddress')}
            {renderText('City', 'respondentCity')}
            {renderText('State', 'respondentState')}
            {renderText('Zip', 'respondentZip')}
            {renderText('Dealership Representative (if applicable)', 'dealershipRep')}

            <h3 style={sectionTitle}>Vehicle Information (if applicable)</h3>
            {renderText('VIN', 'vin')}
            {renderText('Year', 'year')}
            {renderText('Make', 'make')}
            {renderText('Model', 'model')}
            {renderText('Color', 'color')}
            {renderText('Plate Number', 'plateNumber')}
            {renderText('Plate or U-Title', 'plateOrUtitle')}

            <h3 style={sectionTitle}>Complaint Details</h3>
            {renderText('Complaint Type', 'complaintType')}
            {renderTextarea('Explain Complaint', 'explainComplaint')}

            <h3 style={sectionTitle}>E-Sign Confirmation</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <input
                type="checkbox"
                name="signatureConfirmed"
                checked={formData.signatureConfirmed}
                onChange={handleChange}
              />
              I certify that the information provided above is true and accurate.
            </label>

            <button
              type="submit"
              style={{
                backgroundColor: pioneerBlue,
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Submit Complaint
            </button>
          </>
        ) : (
          <div
            style={{
              padding: '20px',
              border: `2px solid ${gold}`,
              borderRadius: '8px',
              backgroundColor: lightGray,
            }}
          >
            <h3 style={{ color: pioneerBlue, marginTop: 0 }}>Complaint Submitted</h3>
            <p style={{ marginTop: 0 }}>
              Thank you for submitting your complaint.
              {caseNumber ? ` Your case number is ${caseNumber}.` : ''}
            </p>

            {summarySections.map((section) => (
              <section key={section.title} style={{ marginTop: '20px' }}>
                <h4 style={{ color: pioneerBlue, marginBottom: '10px' }}>{section.title}</h4>
                <div
                  style={{
                    display: 'grid',
                    gap: '10px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    padding: '14px',
                  }}
                >
                  {section.fields.map(([label, field]) => (
                    <div
                      key={field}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(160px, 220px) 1fr',
                        gap: '12px',
                        alignItems: 'start',
                      }}
                    >
                      <strong>{label}</strong>
                      <span style={{ whiteSpace: 'pre-wrap' }}>{String(submittedData[field] || 'Not provided')}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
