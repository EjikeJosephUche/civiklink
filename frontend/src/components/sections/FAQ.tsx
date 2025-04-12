import React from "react";
import styles from "../../styles/homePage.module.css";

const FAQ: React.FC = () => {
  return (
    <section className={styles.faqSection}>
      <h2 className={styles.faqSectionTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {[
          {
            question: "How does the AI therapist work?",
            answer:
              "Our AI therapist uses advanced algorithms to provide personalized mental health tips based on your mood and input. It's like having a supportive friend available 24/7.",
          },
          {
            question: "Is my data secure?",
            answer:
              "Yes, we use industry-standard encryption to ensure that your data is kept secure.",
          },
          {
            question: "Can I use CivicLink offline?",
            answer:
              "CivicLink requires an internet connection to function properly.",
          },
          {
            question: "How do I reset my password?",
            answer:
              "You can reset your password by clicking the 'Forgot Password' link on the login page.",
          },
          {
            question: "What's included in the free plan?",
            answer:
              "The free plan includes access to basic features and support for up to 5 users.",
          },
        ].map((item, idx) => (
          <details key={idx} className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              {item.question}
              <img
                src="./images/arrow-down-01.png"
                alt="Dropdown icon"
                className={styles.dropdownIcon}
              />
            </summary>
            {item.answer && <p className={styles.faqAnswer}>{item.answer}</p>}
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
