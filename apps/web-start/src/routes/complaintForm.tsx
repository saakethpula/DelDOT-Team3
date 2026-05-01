import { createFileRoute } from '@tanstack/react-router';
import { useEffect,useState } from 'react';

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




export const Route = createFileRoute('/complaintForm')({
  component: ComplaintForm,
});

function ComplaintForm() {
  const pioneerBlue = '#00415B';
  const gold = '#EAD788';
  const lightGray = '#F7F7F7';

  const [formData, setFormData] = useState<ComplaintFormData>(() => {
    const saved = localStorage.getItem("complaint_form_data");
    return saved
    ? JSON.parse(saved): {
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
    signatureConfirmed: false};
  });

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {localStorage.setItem("complaint_form_data", JSON.stringify(formData));}, [formData]);


  const validateAddress = (address: string, city: string, state: string, zip: string): string | null => {
    if (!address || !address.trim()) {
      return 'Address is required'
    }
    if (!city || !city.trim()) {
      return 'City is required'
    }
    if (!state || !state.trim()) {
      return 'State is required'
    }
    if (!zip || !zip.trim()) {
      return 'ZIP code is required'
    }
    // Basic ZIP validation (5 digits)
    const zipRegex = /^\d{5}$/
    if (!zipRegex.test(zip.trim())) {
      return 'ZIP code must be 5 digits'
    }
    return null
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // Validate customer address if any field is filled
    if (formData.customerAddress || formData.customerCity || formData.customerState || formData.customerZip) {
      const customerError = validateAddress(formData.customerAddress, formData.customerCity, formData.customerState, formData.customerZip)
      if (customerError) {
        errors.customerAddress = customerError
      }
    }

    // Validate respondent address if any field is filled
    if (formData.respondentAddress || formData.respondentCity || formData.respondentState || formData.respondentZip) {
      const respondentError = validateAddress(formData.respondentAddress, formData.respondentCity, formData.respondentState, formData.respondentZip)
      if (respondentError) {
        errors.respondentAddress = respondentError
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) alert(`Uploaded: ${file.name}`);
    };
    input.click();
  };

  const handleConfirm = () => {
    const uuid = crypto.randomUUID();
    setReferenceId(`REF-DMV-${uuid}`);
    setIsConfirmed(true);
  };

  const handleEdit = () => {
    setIsConfirmed(false);
    setReferenceId(null);
    setValidationErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.signatureConfirmed) {
      alert('Please check the E-sign confirmation before submitting.');
      return;
    }

    if (!validateForm()) {
      alert('Please fix the validation errors before submitting.');
      return;
    }

    console.log('Submitting complaint:', formData);
    await new Promise((res) => setTimeout(res, 1000)); // mock backend
    alert('Complaint submitted successfully!');
    localStorage.removeItem("complaint_form_data");
  };

  const sectionTitle = {
    backgroundColor: gold,
    color: pioneerBlue,
    padding: '8px 12px',
    borderRadius: '4px',
    marginTop: '20px',
  };

  const labelStyle = { display: 'block', marginBottom: '10px' };
  const inputStyle = (disabled: boolean) => ({
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '5px 0 15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: disabled ? '#f3f3f3' : 'white',
  });

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: lightGray,
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      {/* HEADER */}
      <header
        style={{
          backgroundColor: pioneerBlue,
          color: 'white',
          padding: '15px 20px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Delaware DMV Complaint Form</h2>
        <button
          onClick={handleUpload}
          style={{
            background: gold,
            color: pioneerBlue,
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Upload (optional)
        </button>
      </header>

      {/* FORM + CONFIRMATION SECTION */}
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
        {!isConfirmed ? (
          <>
            {/* CUSTOMER INFO */}
            <h3 style={sectionTitle}>Customer Information</h3>
            {renderText('Full Name', 'customerName')}
            {renderText('Phone', 'customerPhone')}
            {renderText('Email', 'customerEmail')}
            {renderText('Address', 'customerAddress')}
            {renderText('City', 'customerCity')}
            {renderText('State', 'customerState')}
            {renderText('Zip', 'customerZip')}

            {/* RESPONDENT INFO */}
            <h3 style={sectionTitle}>
              Business or Individual Being Complained Against
            </h3>
            {renderText('Name', 'respondentName')}
            {renderText('Phone', 'respondentPhone')}
            {renderText('Address', 'respondentAddress')}
            {renderText('City', 'respondentCity')}
            {renderText('State', 'respondentState')}
            {renderText('Zip', 'respondentZip')}
            {renderText(
              'Dealership Representative (if applicable)',
              'dealershipRep'
            )}

            {/* VEHICLE INFO */}
            <h3 style={sectionTitle}>Vehicle Information (if applicable)</h3>
            {renderText('VIN', 'vin')}
            {renderText('Year', 'year')}
            {renderText('Make', 'make')}
            {renderText('Model', 'model')}
            {renderText('Color', 'color')}
            {renderText('Plate Number', 'plateNumber')}
            {renderText('Plate or U-Title', 'plateOrUtitle')}

            {/* COMPLAINT DETAILS */}
            <h3 style={sectionTitle}>Complaint Details</h3>
            {renderText('Complaint Type', 'complaintType')}
            {renderTextarea('Explain Complaint', 'explainComplaint')}
          </>
        ) : (
          <>
            <div
              style={{
                padding: '10px',
                border: `2px solid ${gold}`,
                borderRadius: '8px',
                backgroundColor: lightGray,
                marginBottom: '20px',
              }}
            >
              <h3 style={{ color: pioneerBlue }}>Confirmation Receipt</h3>
              <p>
                <strong>Reference ID:</strong> {referenceId}
              </p>
              <p>Thank you for submitting your complaint.</p>
              <h4 style={{ color: pioneerBlue }}>Submitted Information</h4>
              <pre
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  padding: '10px',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.5,
                }}
              >
                {Object.entries(formData)
                  .filter(([key]) => key !== 'signatureConfirmed')
                  .map(
                    ([key, value]) =>
                      `${key}: ${String(value ?? '')}`
                  )
                  .join('\n')}
              </pre>
            </div>
          </>
        )}

        {/* E-SIGN */}
        <h3 style={sectionTitle}>E-Sign Confirmation</h3>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
          }}
        >
          <input
            type="checkbox"
            name="signatureConfirmed"
            checked={formData.signatureConfirmed}
            onChange={handleChange}
            disabled={isConfirmed}
          />
          I certify that the information provided above is true and accurate.
        </label>

        {/* BUTTONS */}
        <div style={{ marginTop: '10px' }}>
          {!isConfirmed ? (
            <button
              type="button"
              onClick={handleConfirm}
              style={{
                backgroundColor: gold,
                color: pioneerBlue,
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginRight: '10px',
              }}
            >
              Confirm
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              style={{
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginRight: '10px',
              }}
            >
              Go Back / Edit
            </button>
          )}

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
        </div>
      </form>
    </div>
  );

  // helpers for rendering fields
  function renderText(label: string, name: keyof typeof formData) {
    const isAddressField = name.includes('Address') || name.includes('City') || name.includes('State') || name.includes('Zip');
    const errorKey = isAddressField ? name.replace(/City|State|Zip$/, 'Address') : name;
    
    return (
      <label style={labelStyle}>
        {label}
        <input
          type="text"
          name={name}
          value={String(formData[name] ?? '')}
          onChange={handleChange}
          style={inputStyle(false)}
          required={name === 'customerName'}
        />
        {validationErrors[errorKey] && (
          <div style={{ color: 'red', fontSize: '12px', marginTop: '2px' }}>
            {validationErrors[errorKey]}
          </div>
        )}
      </label>
    );
  }

  function renderTextarea(label: string, name: keyof typeof formData) {
    return (
      <label style={labelStyle}>
        {label}
        <textarea
          name={name}
          value={String(formData[name] ?? '')}
          onChange={handleChange}
          rows={5}
          style={inputStyle(false)}
        />
      </label>
    );
  }
}

