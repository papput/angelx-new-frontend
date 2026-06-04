import React from "react";
import PageMeta from "./PageMeta";
// import "./PrivacyPolicy.css"; // optional (থাকলে)

const PrivacyPolicy = () => {
  return (
    <>
      <PageMeta
        title="Privacy Policy | AngelX Exchange"
        description="Read AngelX Exchange Privacy Policy to understand how we collect, use, and protect your personal data while using our services."
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        canonical="https://angelx.exchange/privacy-policy"
      />

      <div className="policy-container">
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> December 18, 2025</p>

        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>

        <p>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>

        <h2>Interpretation and Definitions</h2>

        <h3>Interpretation</h3>
        <p>
          The words whose initial letters are capitalized have meanings defined
          under the following conditions. The following definitions shall have
          the same meaning regardless of whether they appear in singular or in
          plural.
        </p>

        <h3>Definitions</h3>
        <ul>
          <li><strong>Account</strong> means a unique account created for You to access our Service.</li>
          <li><strong>Affiliate</strong> means an entity under common control with the Company.</li>
          <li><strong>Company</strong> refers to angelx.exchange.</li>
          <li><strong>Cookies</strong> are small files placed on Your device.</li>
          <li><strong>Country</strong> refers to Haryana, India.</li>
          <li><strong>Device</strong> means any device that can access the Service.</li>
          <li><strong>Personal Data</strong> is any information relating to an individual.</li>
          <li><strong>Service</strong> refers to the Website.</li>
          <li><strong>Service Provider</strong> means any party processing data on behalf of the Company.</li>
          <li><strong>Usage Data</strong> refers to automatically collected data.</li>
          <li>
            <strong>Website</strong> refers to angelx.exchange,
            accessible from{" "}
            <a href="https://angelx.exchange/" target="_blank" rel="noreferrer">
              https://angelx.exchange/
            </a>
          </li>
          <li><strong>You</strong> means the individual using the Service.</li>
        </ul>

        <h2>Collecting and Using Your Personal Data</h2>

        <h3>Types of Data Collected</h3>

        <h4>Personal Data</h4>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Usage Data</li>
        </ul>

        <h4>Usage Data</h4>
        <p>
          Usage Data is collected automatically when using the Service, such as
          IP address, browser type, visited pages, time spent, and diagnostic
          data.
        </p>

        <h3>Tracking Technologies and Cookies</h3>
        <p>
          We use Cookies and similar tracking technologies to track activity and
          store certain information to improve our Service.
        </p>

        <h3>Use of Your Personal Data</h3>
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To manage Your account</li>
          <li>To contact You</li>
          <li>To provide offers and updates</li>
          <li>To manage requests</li>
          <li>For legal and business purposes</li>
        </ul>

        <h3>Retention of Your Personal Data</h3>
        <p>
          We retain Personal Data only as long as necessary to comply with legal
          obligations and improve our Service.
        </p>

        <h3>Security of Your Personal Data</h3>
        <p>
          While we strive to protect Your data, no transmission over the Internet
          is 100% secure.
        </p>

        <h2>Children’s Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect Personal Data from children.
        </p>

        <h2>Links to Other Websites</h2>
        <p>
          We are not responsible for third-party websites linked from our
          Service.
        </p>

        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes are
          effective when posted on this page.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions, contact us:</p>
        <ul>
          <li>Email: <a href="mailto:paput6301@gmail.com">paput6301@gmail.com</a></li>
          <li>
            Website:{" "}
            <a href="https://angelx.exchange/" target="_blank" rel="noreferrer">
              https://angelx.exchange/
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PrivacyPolicy;
