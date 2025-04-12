import { useState, useEffect } from 'react';
import { AmenitiesCard } from '../components/cards/AmenitiesCard';
import { sectors } from '../data/sectors';
import { GovOne } from './sections/GovOne';

interface Props {
  onContinue: (sector: string) => void;
}

const StepSelectSector = ({ onContinue }: Props) => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [columns, setColumns] = useState<number>(4); // Default to 4 columns

  // Adjust the number of columns based on screen width
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setColumns(4); // 4 columns for large screens
      } else if (width >= 768) {
        setColumns(3); // 3 columns for medium screens
      } else if (width >= 480) {
        setColumns(2); // 2 columns for smaller screens
      } else {
        setColumns(1); // 1 column for very small screens (mobile)
      }
    };

    // Run on component mount and window resize
    updateColumns();
    window.addEventListener('resize', updateColumns);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  return (
    <>
      <GovOne header={"Find the Right Office"} subheader='Step 1 of 3: Select the issue you need help with' />

      <div
        className="cardsContainer"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`, // Dynamic number of columns
          gap: '1rem', // Spacing between cards
        }}
      >
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
              background: '#164B1A',
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
