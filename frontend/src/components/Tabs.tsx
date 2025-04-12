import '../styles/tabs.css';
import {  FaChevronDown } from 'react-icons/fa';

type TabProps = {
  label: string;
  content: string[];
};

const Tab: React.FC<TabProps> = ({ label, content }) => {
  

  return (
    <div className="single-tab-container">
      <button className="single-tab-button" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        {label} <FaChevronDown />
      </button>

       
        <div className="single-tab-content">
          {content.map((item, index) => (
            <div key={index} className="tab-row">
              {item}
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default Tab;
