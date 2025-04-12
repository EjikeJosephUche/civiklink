
import React, { useEffect, useState } from "react";
import "./showOfficial.css";
import { useFormContext } from "./FormContext";
import { GovOne } from "./sections/GovOne";

interface Official {
  name: string;
  title: string;
  photoUrl: string;
  contact: string;
  bio: string;
}

const StepShowOfficial: React.FC = () => {
  const { selectedSector, selectedState, selectedLga } = useFormContext();
  const [official, setOfficial] = useState<Official | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOfficial = async () => {
      try {
        setLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

       let mockOfficial: Official;

if (selectedSector === "Health" && selectedState === "Lagos") {
  mockOfficial = {
    name: "Dr. Ada Okeke",
    title: "Commissioner of Health, Lagos",
    photoUrl: "https://via.placeholder.com/120",
    contact: "ada.okeke@lagos.gov.ng",
    bio: "20+ years of public health experience in Lagos State.",
  };
} else if (selectedSector === "Education" && selectedState === "Abuja") {
  mockOfficial = {
    name: "Mr. John Bello",
    title: "Minister of Education",
    photoUrl: "https://via.placeholder.com/120",
    contact: "john.bello@edu.ng",
    bio: "Focused on modernizing education in Abuja.",
  };
} else if (selectedSector === "Roads" && selectedState === "Kano") {
  mockOfficial = {
    name: "Engr. Musa Ibrahim",
    title: "Commissioner of Works",
    photoUrl: "https://via.placeholder.com/120",
    contact: "musa.ibrahim@kano.gov.ng",
    bio: "Overseeing roads and infrastructure in Kano State.",
  };
} else {
  mockOfficial = {
    name: "Unknown Official",
    title: "Position Not Found",
    photoUrl: "https://via.placeholder.com/120",
    contact: "not.available@gov.ng",
    bio: "We couldn't find a match for your selection.",
  };
}

        setOfficial(mockOfficial);
      } catch (err) {
        setError("Could not fetch official. Try again.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedSector && selectedState && selectedLga) {
      fetchOfficial();
    }
  }, [selectedSector, selectedState, selectedLga]);

  if (loading) return <p>Loading official info...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <GovOne
        header="Find the Right Office"
        subheader="Step 3 of 3: Contact the appropriate official"
      />
      <div className="official-card-container">
        {official ? (
          <div className="official-card">
            <img
              src={official.photoUrl}
              alt={official.name}
              className="official-image"
            />
            <h2>{official.name}</h2>
            <h4>{official.title}</h4>
            <p>{official.bio}</p>
            <p>
              <strong>Contact:</strong> {official.contact}
            </p>
          </div>
        ) : (
          <p>No official found for the selected region/sector.</p>
        )}
      </div>
    </>
  );
};

export default StepShowOfficial;



// interface StepShowOfficialProps {
//   sector: string;
//   location: string;
//   onBack: () => void;
// }

// const StepShowOfficial = ({ sector, location, onBack }: StepShowOfficialProps) => {
//   const officialsMap: Record<string, Record<string, string>> = {
//     'Roads & Transport': {
//       Lagos: 'Commissioner of Works, Lagos',
//       Abuja: 'Minister of Transport, Abuja',
//     },
//     Education: {
//       Lagos: 'Commissioner of Education, Lagos',
//       Abuja: 'Minister of Education, Abuja',
//     },
//     Health: {
//       Lagos: 'Commissioner of Health, Lagos',
//       Abuja: 'Minister of Health, Abuja',
//     },
//   };

//   const official = officialsMap[sector]?.[location] || 'No official found for this selection.';

//   return (
//     <div>
//             <GovOne header="Find the Right Office" subheader="Step 3 of 3: Contact the appropriate official" />

//       <p><strong>Sector:</strong> {sector}</p>
//       <p><strong>Location:</strong> {location}</p>
//       <p><strong>Official:</strong> {official}</p>

//       <button onClick={onBack} style={{background: '#164B1A', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', cursor:'pointer' }}>Go Back</button>
//     </div>
//   );
// };

// export default StepShowOfficial;















































// const StepShowOfficial = ({ sector, location, onBack }: StepShowOfficialProps) => {
//   // Mock database
//   const officialsMap = {
//     'Roads & Transport': {
//       Lagos: 'Commissioner of Works, Lagos',
//       Abuja: 'Minister of Transport, Abuja',
//     },
//     Education: {
//       Lagos: 'Commissioner of Education, Lagos',
//       Abuja: 'Minister of Education, Abuja',
//     },
//   };

//   const official = officialsMap[sector]?.[location] || 'No official found for this selection.';

//   return (
//     <div>
//       <h2>Responsible Official</h2>
//       <p><strong>Sector:</strong> {sector}</p>
//       <p><strong>Location:</strong> {location}</p>
//       <p><strong>Official:</strong> {official}</p>

//       <button onClick={onBack}>Go Back</button>
//     </div>
//   );
// };

// export default StepShowOfficial;
