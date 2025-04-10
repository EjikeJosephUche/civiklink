import './AmenitiesCard.css'
interface CardProps {
 image: string;
 title: string;
 alt?:  string
}


export const AmenitiesCard = ({ image, title, alt="card image"}: CardProps) => {
 return (
  <div className="card">
   <img  className="card-img" src={image} alt={alt} />
<h3 className="card-title">{title}</h3>
  </div>
 );
}