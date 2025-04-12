import styles from '../../styles/homePage.module.css';

export const Offer = () => {
  return (
    <section className={styles.offersSection}>
      <h2 className={styles.offerHeader}>What CivicLink Offers</h2>
      <p className={styles.offerHeaderSubText}>Discover tools designed to support your search for information about the government</p>
      <div className={styles.offersGrid}>
        {[
          {
            title: "Navigate your way through govt. information",
            subtitle: "GOVERNMENT STRUCTURE NAVIGATOR",
            description:
              "Get tailored information about government personnels and representatives.",
            className: styles.cardWhite,
          },
          {
            title: "Stay informed with verified news and updates",
            subtitle: "VERIFIED NEWS UPDATES",
            description:
              "Get daily news updates from reliable and verified sources without fear of being misled.",
            className: styles.cardYellow,
          },
          {
            title:
              "Channel your complaints and suggestions to the right offices",
            subtitle: "OFFICIAL COMPLAINT & SUGGESTION CHANNELS",
            description:
              "Send complaints, suggestions & opinions to the right offices and have them looked into.",
            className: styles.cardBlue,
          },
        ].map((card, index) => (
          <div key={index} className={`${styles.offerCard} ${card.className}`}>
            <h3 className={styles.offerTitle}>{card.title}</h3>
            <p className={styles.offerSubtitle}>{card.subtitle}</p>
            <p className={styles.offerDescription}>{card.description}</p>
            <button className={styles.exploreButton}>Explore</button>
          </div>
        ))}
      </div>
    </section>
  );
};
