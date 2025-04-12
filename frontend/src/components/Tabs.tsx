import '../styles/tabs.css';
import {  FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

type TabProps = {
  label: string;
  content: string[];
};

const Tab: React.FC<TabProps> = ({ label, content }) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="single-tab-container">
      <button className="single-tab-button" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} onClick={() => setIsOpen(!isOpen)}>
        {label} <FaChevronDown />
      </button>

       
      {isOpen && (
        <div className="single-tab-content">
          {content.map((item, index) => (
            <div key={index} className="tab-row">
              {item}
            </div>
          ))}
        </div>
)}
    </div>
        
  );
};

export default Tab;
