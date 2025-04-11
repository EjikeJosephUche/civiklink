import { useState } from 'react';
import StepSelectSector from './StepSelectSector';
import StepSelectLocation from '../components/StepSelectLocation';
import StepShowOfficial from '../components/StepShowOfficial';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  return (
    <div className="multi-step-form">
      {step === 1 && (
        <StepSelectSector
          onContinue={(selectedSector) => {
            setSector(selectedSector);
            handleNext();
          }}
        />
      )}
      {step === 2 && (
        <StepSelectLocation
          onContinue={(selectedLocation) => {
            setLocation(selectedLocation);
            handleNext();
          }}
          onBack={handlePrev}
        />
      )}
      {step === 3 && (
        <StepShowOfficial sector={sector!} location={location!} onBack={handlePrev} />
      )}
    </div>
  );
};

export default MultiStepForm;
