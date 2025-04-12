import { GovBtnSection } from "../components/sections/GovBtnSection";
import { GovOne } from "../components/sections/GovOne";
import Tabs from "../components/Tabs";
import '../styles/tabs.css'
// import { FaBuildingFlag } from "react-icons/fa6";

const Government = () => {
   const fedral = ['Federal Ministry of Works', 'Federal Housing Authority', 'Federal Ministry of Water Resourses'];
   const state = ['Ministry of Works and Infrastructure', 'Lagos Metropolitan Area Transport Authority', 'Ministry of Physical Planning and Urban Development', 'Ministry of Environment'];
   const local = ['Works Department', 'Environment Department', 'Ministry of Physical Planning and Urban Development', 'Ministry of Environment'];
 return (
<>
<GovOne header="Government Structure Explorer" subheader="Browse the complete government structure for Lagos state"/>

<div className="state-container" style={{display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '61px'}}>
 <div style={{padding: '10px 14px', borderRadius: '8px', fontSize: '23px', fontWeight: '700', lineHeight: '140%', background: '#164B1A', color: 'white'}}>Lagos State</div>
 <div style={{padding: '10px 14px', borderRadius: '8px', fontSize: '23px', fontWeight: '700', lineHeight: '140%', background: '#E8EFE9', color: '#012103'}}>Ikeja LGA</div>
</div>


      <Tabs label="Federal Government Offices" content={fedral} />
      <Tabs label="Lagos State Government" content={state} />
      <Tabs label="Ikeja Local Government" content={local} />

      <GovBtnSection />
</>

 );

}
export default Government;