import FAQ from "../components/sections/FAQ";
import { Hero } from "../components/sections/Hero";
import { News } from "../components/sections/News";
import { Offer } from "../components/sections/Offer";
import { Office } from "../components/sections/Office";

const Home = () => {
 return (
 <>
 <Hero />
  <Office />
  <Offer />
  <News />
  <FAQ />
 </>
  
 );
}
export default Home;