import { useState } from 'react';
import { AmenitiesCard } from '../components/cards/AmenitiesCard';
import { sectors } from '../data/sectors';
import { GovOne } from './sections/GovOne';



// const sectors = [
//   { title: 'Roads & Transport', image: '/assets/img/roads.png' },
//   { title: 'Education', image: '/assets/img/education.png' },
//   { title: 'Health', image: '/assets/img/health.png' },
// ];

interface Props {
  onContinue: (sector: string) => void;
}

const StepSelectSector = ({ onContinue }: Props) => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  return (
    <>
  <GovOne header={"Find the Right Office"} subheader='Step 1 of 3: Select the issue you need help with'/>

      <div className="cardsContainer">
        {sectors.map((item) => (
          <div
            key={item.title}
            onClick={() => setSelectedSector(item.title)}
            style={{
              border: selectedSector === item.title ? '2px solid green' : 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              padding: '1rem',
            }}
          >
            <AmenitiesCard image={item.image} title={item.title} />
          </div>
        ))}
      </div>

      {/* Continue Button */}
      {selectedSector && (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
    <button
      style={{
        padding: '0.75rem 1.5rem',
        background: 'green',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={() => onContinue(selectedSector)}
    >
      Continue
    </button>
  </div>
)}


       
    </>
  );
};

export default StepSelectSector;
