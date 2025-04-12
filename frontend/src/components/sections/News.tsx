// import React from "react";
import styles from "../../styles/homePage.module.css";

export const News = () => {
  return (
    <section className={styles.newsSection}>
      <h2 className={styles.newsHeader}>News & Updates</h2>
      <div className={styles.newsContent}>
        <div className={styles.newsText}>
          <h3 className={styles.newsTitle}>
            US-China tariff war could cut trade between both countries by 80% —
            WTO chief, Okonjo-Iweala
          </h3>
          <p className={styles.newsDescription}>
            Even as he slapped further tariffs on China, Trump paused higher
            tariffs on the rest of the world for 90 days after dozens of
            countries reached out for negotiations...
          </p>
          <button className={styles.viewNewsButton}>View More News</button>
        </div>
        <img
          src="./images/image 1.png"
          alt="Okonjo-Iweala"
          className={styles.newsImage}
        />
      </div>
    </section>
  );
};
