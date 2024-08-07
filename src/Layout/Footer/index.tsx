import React from "react";
import styles from "./index.module.scss";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <nav className={styles.footerNav}>
          <ul className={styles.footerNavList}>
            <li className={styles.footerTitle}>
             Currency Convertor App
            </li>
          </ul>
          <ul className={styles.footerNavList}>
            <li className={styles.footerNavItem}>
              <a
                href="mailto:renaquliyevva@gmail.com"
                className={styles.footerNavLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MailOutlined />
              </a>
            </li>
            <li className={styles.footerNavItem}>
              <a
                href="https://www.linkedin.com/in/rənaquliyeva"
                className={styles.footerNavLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinOutlined />
              </a>
            </li>
            <li className={styles.footerNavItem}>
              <a
                href="https://github.com/Quliyeva1o"
                className={styles.footerNavLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubOutlined />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
