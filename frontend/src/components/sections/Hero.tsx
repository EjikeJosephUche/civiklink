// import React from "react";
import styles from '../../styles/homePage.module.css';

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundImage: "url('images/hero.png')",
        }}
      >
        <h1 className={styles.heroTitle}>Welcome to CivicLink Portal</h1>
        <p className={styles.heroSubtitle}>
         
          Access services, find information, and connect with government.
        </p>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder=" Search for services (e.g., government officials, passports, taxes, permits)..."
            className={styles.searchInput}
          />
          <button className={styles.searchBotton}>Search</button>
        </div>
      </div>
    </section>
  );
};


// // import styles from './Hero.module.css';

// export const Hero = () => {
//   return (
//     <></>
//       // <div className={styles.heroContents}>
//       //   <div className={styles.overlay}></div>
//       //   <h1 className={styles.heroHeader}>Welcome to CivicLink Portal</h1>
//       //   <p>Access services, find information, and connect with government.</p>
//       //   <input type="text" placeholder="Search for services (e.g., government officials, passports, taxes, permits)..." />
//       //   <button className={styles.btn}>Search</button>
//       // </div>
    
//   );
// }
