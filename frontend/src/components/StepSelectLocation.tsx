import { useState, useEffect } from 'react';
import naijaStates from 'naija-state-local-government';
import { GovOne } from './sections/GovOne';
import '../styles/global.css'



interface Props {
  onContinue: (location: string) => void;
  onBack: () => void;
}

const StepSelectLocation = ({ onContinue, onBack }: Props) => {
  const [state, setState] = useState('');
  const [lga, setLga] = useState('');
  const [ward, setWard] = useState('');
  const [lgas, setLgas] = useState<string[]>([]);
  const [showOfficial, setShowOfficial] = useState(false);
  const [loading, setLoading] = useState(true);

  const states = naijaStates.states();

  // Mock data for government officials
  const official = {
    name: 'John Doe',
    sector: 'Minister of Health',
    state: 'Lagos',
    lga: 'Ikeja',
    contact: '+234 123 456 789',
    profilePicture: 'https://via.placeholder.com/150', // Use a real URL or API to fetch image
  };

  // Fetch LGAs based on selected state
 useEffect(() => {
  if (state) {
    try {
      const result = naijaStates.lgas(state) as unknown;

      let lgaData: string[] = [];

      if (Array.isArray(result)) {
        lgaData = result;
      } else if (
        result &&
        typeof result === 'object' &&
        'lgas' in result &&
        Array.isArray((result as { lgas: unknown }).lgas)
      ) {
        lgaData = (result as { lgas: string[] }).lgas;
      }

      setLgas(lgaData);
    } catch (err) {
      console.error('Failed to load LGAs:', err);
      setLgas([]);
    }
  } else {
    setLgas([]);
  }
}, [state]);





  const handleContinue = () => {
    const selectedLocation = `${ward ? ward + ', ' : ''}${lga}, ${state}`;
    setShowOfficial(true); // Show official profile after continue
    onContinue(selectedLocation);
  };
   // Simulate loading of the map
  useEffect(() => {
    // Replace with actual map load event in production
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds (simulated)
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <GovOne header="Find the Right Office" subheader="Step 2 of 3: Choose your location" />

       {/* Map with Loading state */}
      <div style={{ width: '80%', height: '450px', marginBottom: '2rem', margin: '0 auto', position: 'relative' }}>
        {loading ? (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <span style={{color: 'green', fontSize: '28px', fontWeight: '500'}}>Loading map...</span> {/* Replace with a spinner or more advanced loading state */}
          </div>
        ) : (
          <iframe
            title="Map of Nigeria"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://maps.google.com/maps?q=Nigeria&z=6&output=embed"
            allowFullScreen
          />
        )}
      </div>

      {/* Inputs */}
      <div className='input-container' style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', width: '80%', margin: '41px auto', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* State */}
        <div style={{ flexDirection: 'column', display: 'flex' }}>
          <label style={{ fontSize: '19px', fontWeight: '700', lineHeight: '140%' }}>State</label>
          <select style={{ border: '1px solid #2D2D2D', padding: '14.5px 20px', width: '400px' }} value={state} onChange={(e) => setState(e.target.value)} required>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* LGA */}
        <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center' }}>
          <label style={{ fontSize: '19px', fontWeight: '700', lineHeight: '140%' }}>Local Government Area</label>
          <select style={{ border: '1px solid #2D2D2D', padding: '14.5px 20px', width: '400px' }} 
            value={lga}
            onChange={(e) => setLga(e.target.value)}
            disabled={!state}
            required
          >
            <option value="">Select LGA</option>
            {lgas.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Ward/Area (optional) */}
        <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
          <label style={{ fontSize: '19px', fontWeight: '700', lineHeight: '140%' }}>Ward/Area (optional)</label>
          <input className='ward' style={{ border: '1px solid #2D2D2D', padding: '14.5px 20px', marginBottom: '0px' }}
            type="text"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            placeholder="Select ward"
          />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack}
        style={{ cursor:'pointer', color: '#164B1A', padding: '0.75rem 1.5rem', border: '1px solid #164B1A',borderRadius: '8px' }}>Back</button>

        <button
          onClick={handleContinue}
          disabled={!state || !lga}
          style={{ cursor:'pointer', background: '#164B1A', color: 'white', padding: '0.75rem 1.5rem', border: 'none',borderRadius: '8px' }}
        >
          Continue
        </button>
      </div>

      {/* Show Official Profile Section */}
      {showOfficial && (
        <div style={{ marginTop: '2rem', width: '80%', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Official Information</h2>
          <div style={{ display: 'flex', gap: '2rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <img
              src={official.profilePicture}
              alt="Official"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
            <div style={{ flex: 1 }}>
              <h3>{official.name}</h3>
              <p><strong>Office:</strong> {official.sector}</p>
              <p><strong>State:</strong> {official.state}</p>
              <p><strong>LGA:</strong> {official.lga}</p>
              <p><strong>Contact:</strong> {official.contact}</p>
              <button
                style={{ background: 'blue', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px' }}
                onClick={() => alert(`Calling ${official.contact}...`)}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepSelectLocation;
