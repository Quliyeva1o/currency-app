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
          <div className={styles.footerNavList}>
            <h4 className={styles.footerTitle}>
              Currency Convertor App
            </h4>
          </div>
          <ul className={styles.footerNavList}>
            {socialLinks.map((link, index) => (
              <li key={index} className={styles.footerNavItem}>
                <a
                  href={link.href}
                  className={styles.footerNavLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;


const socialLinks = [
  {
    href: "mailto:renaquliyevva@gmail.com",
    icon: <MailOutlined />,
    ariaLabel: "Email",
  },
  {
    href: "https://www.linkedin.com/in/rənaquliyeva",
    icon: <LinkedinOutlined />,
    ariaLabel: "LinkedIn",
  },
  {
    href: "https://github.com/Quliyeva1o",
    icon: <GithubOutlined />,
    ariaLabel: "GitHub",
  },
];
