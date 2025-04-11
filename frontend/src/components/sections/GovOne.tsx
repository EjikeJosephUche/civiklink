import './GovOne.css'

interface GovOneProps {
 header: string;
 subheader: string;

};
// Find the Right Office
// Step 1 of 3: Select the issue you need help with

export const GovOne = ({ header, subheader}: GovOneProps) => {
 return (
  <div className="section-one">
   <h1 className="services-header">{header}</h1>
   <p className="services-sub">{subheader}</p>
   <input className="search-input" type="text" name="" id="" placeholder="Search for services (e.g., government officials, passports, taxes, permits)..."/>
  </div>
 );
}