import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';


function Text({ label, name, value, onChange, required = false, type = 'text' }: any) {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          display: 'block',
          width: '100%',
          padding: '8px',
          margin: '5px 0 15px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </label>
  );
}

function Textarea({ label, name, value, onChange, rows = 4 }: any) {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      {label}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        style={{
          display: 'block',
          width: '100%',
          padding: '8px',
          margin: '5px 0 15px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      ></textarea>
    </label>
  );
}

export const Route = createFileRoute('/search')({
  component: ComplaintForm,
});

function ComplaintForm() {
  const pioneerBlue = '#00415B';
  const gold = '#EAD788';
  const lightGray = '#F7F7F7';

  const [formData, setFormData] = useState({
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
    signatureName: '',
    signatureDate: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending complaint:', formData);
      
      await new Promise((res) => setTimeout(res, 1200));
      alert('Complaint submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to submit complaint.');
    }
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

  const sectionTitle = {
    backgroundColor: gold,
    color: pioneerBlue,
    padding: '8px 12px',
    borderRadius: '4px',
    marginTop: '20px',
  };

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

      {/* FORM BODY */}
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
        {/* CUSTOMER INFO */}
        <h3 style={sectionTitle}>Customer Information</h3>
        <Text label="Full Name" name="customerName" value={formData.customerName} onChange={handleChange} required />
        <Text label="Phone" name="customerPhone" value={formData.customerPhone} onChange={handleChange} />
        <Text label="Email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} />
        <Text label="Address" name="customerAddress" value={formData.customerAddress} onChange={handleChange} />
        <Text label="City" name="customerCity" value={formData.customerCity} onChange={handleChange} />
        <Text label="State" name="customerState" value={formData.customerState} onChange={handleChange} />
        <Text label="Zip" name="customerZip" value={formData.customerZip} onChange={handleChange} />

        {/* RESPONDENT INFO */}
        <h3 style={sectionTitle}>Business or Individual Being Complained Against</h3>
        <Text label="Name" name="respondentName" value={formData.respondentName} onChange={handleChange} />
        <Text label="Phone" name="respondentPhone" value={formData.respondentPhone} onChange={handleChange} />
        <Text label="Address" name="respondentAddress" value={formData.respondentAddress} onChange={handleChange} />
        <Text label="City" name="respondentCity" value={formData.respondentCity} onChange={handleChange} />
        <Text label="State" name="respondentState" value={formData.respondentState} onChange={handleChange} />
        <Text label="Zip" name="respondentZip" value={formData.respondentZip} onChange={handleChange} />
        <Text label="Dealership Representative (if applicable)" name="dealershipRep" value={formData.dealershipRep} onChange={handleChange} />

        {/* VEHICLE INFO */}
        <h3 style={sectionTitle}>Vehicle Information (if applicable)</h3>
        <Text label="VIN" name="vin" value={formData.vin} onChange={handleChange} />
        <Text label="Year" name="year" value={formData.year} onChange={handleChange} />
        <Text label="Make" name="make" value={formData.make} onChange={handleChange} />
        <Text label="Model" name="model" value={formData.model} onChange={handleChange} />
        <Text label="Color" name="color" value={formData.color} onChange={handleChange} />
        <Text label="Plate Number" name="plateNumber" value={formData.plateNumber} onChange={handleChange} />
        <Text label="Plate or U-Title" name="plateOrUtitle" value={formData.plateOrUtitle} onChange={handleChange} />

        {/* COMPLAINT DETAILS */}
        <h3 style={sectionTitle}>Complaint Details</h3>
        <Text label="Complaint Type" name="complaintType" value={formData.complaintType} onChange={handleChange} />
        <Textarea label="Explain Complaint" name="explainComplaint" value={formData.explainComplaint} onChange={handleChange} rows={5} />

        {/* SIGNATURE */}
        <h3 style={sectionTitle}>Signature</h3>
        <Text label="Your Full Name (Signature)" name="signatureName" value={formData.signatureName} onChange={handleChange} />
        <Text label="Date" name="signatureDate" value={formData.signatureDate} onChange={handleChange} type="date" />

        <button
          type="submit"
          style={{
            backgroundColor: pioneerBlue,
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '20px',
          }}
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
