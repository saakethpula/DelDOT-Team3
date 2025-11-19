import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  const pioneerBlue = '#00415B';
  const gold = '#EAD788';
  const lightGray = '#F7F7F7';

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: lightGray,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* HEADER */}
      <header
        style={{
          backgroundColor: pioneerBlue,
          color: 'white',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>Delaware DMV Complaint Portal</h1>
        <img
          src="/public/download.png"
          alt="Delaware Seal"
          style={{ height: '50px' }}
        />
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 20px',
        }}
      >
        <h2 style={{ color: pioneerBlue, marginBottom: '10px' }}>
          Welcome to the Delaware DMV Compliance & Investigations Unit
        </h2>
        <p style={{ color: '#333', maxWidth: '600px', lineHeight: '1.6' }}>
          Use this portal to file an official complaint regarding a vehicle sale,
          repair, dealership, or other DMV related issue. Please provide accurate
          details to ensure your report is processed efficiently.
        </p>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            border: `2px solid ${gold}`,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            padding: '30px',
            marginTop: '30px',
            maxWidth: '400px',
          }}
        >
          <h3 style={{ color: pioneerBlue }}>Ready to Begin?</h3>
          <p style={{ color: '#444' }}>
            Click below to access the official complaint submission form.
          </p>
          <Link to="/complaintForm">
            <button
              style={{
                backgroundColor: pioneerBlue,
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            >
              File a Complaint
            </button>
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: pioneerBlue,
          color: 'white',
          textAlign: 'center',
          padding: '15px',
          fontSize: '14px',
        }}
      >
        © {new Date().getFullYear()} Delaware Division of Motor Vehicles | Compliance & Investigations Unit
      </footer>
    </div>
  );
}