// import React from "react";
import styles from "../../styles/homePage.module.css";

export const Office = () => {
  return (
    <section className={styles.officeSelector}>
      <h2 className={styles.sectionTitle}>Find the Right Office</h2>
      <p className={styles.sectionDescription}>
        Not sure who to contact? Use our Government Structure Navigator.
      </p>
      <div className={styles.selectorForm}>
        <select className={styles.dropDown}>
          <option>Select Government Structure</option>
          <option>Ministry of Health</option>
          <option>Ministry of Education</option>
        </select>
        <button className={styles.submitButton}>Search</button>
      </div>
    </section>
  );
};
