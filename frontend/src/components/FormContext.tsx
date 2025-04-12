import { createContext, useContext, useState, ReactNode } from "react";

type FormData = {
  selectedSector: string;
  selectedState: string;
  selectedLga: string;
  setFormData: (data: Partial<FormData>) => void;
};

const FormContext = createContext<FormData | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState({
    selectedSector: "",
    selectedState: "",
    selectedLga: "",
  });

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <FormContext.Provider value={{ ...formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Hook to use form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
