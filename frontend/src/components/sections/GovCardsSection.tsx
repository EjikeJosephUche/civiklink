import "./GovCardsSection.css"
import { AmenitiesCard } from "../cards/AmenitiesCard";
import roadsImg from '../../assets/img/Roads.png';
import agric from '../../assets/img/Agriculture.png';
import education from '../../assets/img/Education.png'
import electricity from '../../assets/img/Electricity.png'
import health from '../../assets/img/Health.png'
import security from '../../assets/img/Security.png'
import tax from '../../assets/img/Tax.png'
import water from '../../assets/img/Water.png'




export const GovCardsSection = () => {

  const amenities = [
    { image: roadsImg, title: 'Road' },
     { image: education, title: 'Education' },
       { image: security, title: 'Security' },
    { image: agric, title: 'Agriculture' },
    { image: health, title: 'Health' },
    { image: water, title: 'Water' },
    { image: electricity, title: 'Electricity' },
   
  
    { image: tax, title: 'Revenue' }
    

  ];


 return (
  <div className="cardsContainer">
 {amenities.map((amenity, idx) => (
        <AmenitiesCard key={idx} image={amenity.image} title={amenity.title} />
      ))}
  </div>
 );
}