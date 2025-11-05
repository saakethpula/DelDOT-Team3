import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/search')({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    complaint: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted!');
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

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#004aad',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
        }}
      >
        <h2>Complaint Form</h2>
        <button onClick={handleUpload} style={{ background: 'white', color: '#004aad', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
          Upload (optional)
        </button>
      </header>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0 15px' }}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0 15px' }}
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0 15px' }}
          />
        </label>

        <label>
          Explain Complaint:
          <textarea
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            rows={4}
            style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0 15px' }}
          ></textarea>
        </label>

        <button type="submit" style={{ background: '#004aad', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}



