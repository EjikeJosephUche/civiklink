import '../../styles/global.css'
import './GovBtnSection.css'
import { Link } from "react-router-dom";


export const GovBtnSection = () => {
 return (
<div className="btn-section">
 <button className='btn-light'><Link to='/services'>Start Over</Link></button>
 <button className='btn-dark' ><Link to='/'>Back to Home</Link></button>
</div>
 );
}