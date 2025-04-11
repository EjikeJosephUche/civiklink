import { useState } from 'react';
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

  const states = naijaStates.states();
  const lgas = state ? naijaStates.lgas(state) : [];

  const handleContinue = () => {
    const selectedLocation = `${ward ? ward + ', ' : ''}${lga}, ${state}`;
    onContinue(selectedLocation);
  };

  return (
    <div>
      <GovOne header="Find the Right Office" subheader="Step 2 of 3: Choose your location" />

      {/* Map */}
      <div style={{ width: '80%', height: '450px', marginBottom: '2rem', margin: '0 auto' }}>
        <iframe
          title="Map of Nigeria"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://maps.google.com/maps?q=Nigeria&z=6&output=embed"
          allowFullScreen
        />
      </div>

      {/* Inputs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', width: '80%', margin: '41px auto', alignItems: 'center' }}>
        {/* State */}
        <div style={{ flexDirection: 'column', display: 'flex'}}>
          <label style={{ fontSize: '19px', fontWeight: '700', lineHeight: '140%', }}>State</label>
          <select style={{border: '1px solid #2D2D2D', padding: '14.5px 20px', width: '400px'}}  value={state} onChange={(e) => setState(e.target.value)} required>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* LGA */}
        <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
          <label style={{ fontSize: '19px', fontWeight: '700', lineHeight: '140%', }}>Local Government Area</label>
          <select style={{border: '1px solid #2D2D2D', padding: '14.5px 20px', width: '400px'}} 
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
        {/* Ward */}
        <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
          <label style={{ fontSize: '19px', fontWeight: '700', lineHeight: '140%' }}>Ward/Area(optional)</label>
          <input style={{ padding: '14.5px 20px'}}
            type="text"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            placeholder="Select ward"
          />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack}>Back</button>
        
        <button
          onClick={handleContinue}
          disabled={!state || !lga}
          style={{ background: 'green', color: 'white', padding: '0.75rem 1.5rem', border: 'none' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepSelectLocation;
