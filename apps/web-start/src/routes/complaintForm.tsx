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




export const Route = createFileRoute('/complaintForm')({
 component: ComplaintForm,
});


function ComplaintForm() {
 const pioneerBlue = '#00415B';
 const gold = '#EAD788';
 const lightGray = '#F7F7F7';


 const [formData, setFormData] = useState<ComplaintFormData>(() => {
  const saved = typeof window !== "undefined"
  ? localStorage.getItem('complaint_form_data')
  : null;
   return saved
     ? JSON.parse(saved)
     : {
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
 });


 const [isConfirmed, setIsConfirmed] = useState(false);
 const [referenceId, setReferenceId] = useState<string | null>(null);


 useEffect(() => {
   localStorage.setItem('complaint_form_data', JSON.stringify(formData));
 }, [formData]);


 const handleChange = (
   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
   const { name, value, type, checked } = e.target as any;
   setFormData((prev) => ({
     ...prev,
     [name]: type === 'checkbox' ? checked : value,
   }));
 };

 const mapTextToForm = async (text: string) => {
  try {
    const backend =
      (import.meta.env as { VITE_BACKEND_URL?: string }).VITE_BACKEND_URL ||
      'http://localhost:3000';

    const response = await fetch(`${backend}/ocr/map`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error('Mapping failed');

    const mappedData = await response.json();
    console.log('🟦 Mapped Data from backend:', mappedData); // <-- debug

    // Merge only non-empty values to avoid overwriting existing form fields
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

    alert('Form auto-filled from uploaded file!');
  } catch (err) {
    console.error(err);
    alert('Failed to map form data.');
  }
};



 // ===== PDF Upload Handler =====
 const handleUpload = async () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/pdf,image/*';

  input.onchange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    let fullText = '';
    try {
      if (file.type === 'application/pdf') {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          fullText += strings.join(' ') + '\n';
        }
      } else if (file.type.startsWith('image/')) {
        const result = await Tesseract.recognize(file, 'eng', {
          logger: (m) => console.log(m),
        });
        fullText = result.data.text;
      }

      console.log('Extracted text:', fullText);

      // Step 3: map to form
      await mapTextToForm(fullText);
    } catch (err) {
      console.error(err);
      alert('Failed to read file.');
    }
  };

  input.click();
};


 
 
  // Extract PDF text (needs pdfjsLib passed dynamically)
 const extractPdfText = async (file: File, pdfjsLib: any) => {
   const arrayBuffer = await file.arrayBuffer();
   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
   let fullText = '';


   for (let i = 1; i <= pdf.numPages; i++) {
     const page = await pdf.getPage(i);
     const content = await page.getTextContent();
     const strings = content.items.map((item: any) => item.str);
     fullText += strings.join(' ') + '\n';
   }


   return fullText;
 };


 // ===== Confirmation & Submit =====
 const handleConfirm = () => {
   const uuid = crypto.randomUUID();
   setReferenceId(`REF-DMV-${uuid}`);
   setIsConfirmed(true);
 };


 const handleEdit = () => {
   setIsConfirmed(false);
   setReferenceId(null);
 };


 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!formData.signatureConfirmed) {
     alert('Please check the E-sign confirmation before submitting.');
     return;
   }


   try {
     const backend =
       (import.meta.env as { VITE_BACKEND_URL?: string }).VITE_BACKEND_URL ||
       'http://localhost:3000';
     const url = `${backend.replace(/\/$/, '')}/complaint`;
     const response = await fetch(url, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData),
     });


     if (!response.ok) throw new Error(`Failed to submit: ${response.status}`);
     const result = await response.json();
     alert(
       `Complaint submitted successfully! Case Number: ${
         result.caseNumber || 'N/A'
       }`
     );


     localStorage.removeItem('complaint_form_data');
     setFormData({
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
     });
     setIsConfirmed(false);
     setReferenceId(null);
   } catch (error) {
     console.error('Error submitting complaint:', error);
     alert('Failed to submit complaint. Please try again.');
   }
 };


 // ===== UI Helpers =====
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


 const renderText = (label: string, name: keyof typeof formData) => (
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
   </label>
 );


 const renderTextarea = (label: string, name: keyof typeof formData) => (
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


 // ===== Render =====
 return (
   <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: lightGray, minHeight: '100vh', padding: '20px' }}>
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
         </>
       ) : (
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
           <p><strong>Reference ID:</strong> {referenceId}</p>
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
               .map(([key, value]) => `${key}: ${String(value ?? '')}`)
               .join('\n')}
           </pre>
         </div>
       )}


       <h3 style={sectionTitle}>E-Sign Confirmation</h3>
       <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
         <input
           type="checkbox"
           name="signatureConfirmed"
           checked={formData.signatureConfirmed}
           onChange={handleChange}
           disabled={isConfirmed}
         />
         I certify that the information provided above is true and accurate.
       </label>


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
}



