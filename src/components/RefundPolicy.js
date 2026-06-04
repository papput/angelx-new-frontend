import React from "react";
import "./RefundPolicy.css";
import BackHeader from "./BackHeader";
import PageMeta from "./PageMeta";

const PrivacyPolicy = () => {
  return (
    <>
      <PageMeta
        title="Refund Policy – AngelX Exchange"
        description="Review the refund policy for AngelX Exchange, outlining how refunds are handled for transactions and services on the platform."
        keywords="AngelX refund policy, AngelX exchange refund, USDT refund"
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        canonical="https://angelx.exchange/refund-policy"
      />
      <div className="privacy-container">
        <BackHeader title="Privacy Policy" link="/exchange" />

        <section className="privacy-box">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: October 29, 2025</p>

          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and explains Your privacy rights and how the law protects
            You. By using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>

          <h2>Interpretation and Definitions</h2>

          <h3>Interpretation</h3>
          <p>
            The words whose initial letters are capitalized have meanings
            defined under the following conditions. These definitions have the
            same meaning whether in singular or plural form.
          </p>

          <h3>Definitions</h3>
          <p>
            For the purposes of this Privacy Policy:
            <br />
            <strong>Account</strong> – A unique account created to access our
            Service.
            <br />
            <strong>Company</strong> (“We”, “Us”, or “Our”) refers to
            https://angelx.exchange/.
            <br />
            <strong>Personal Data</strong> – Any information that identifies an
            individual.
            <br />
            <strong>Device</strong> – Any device that can access the Service.
            <br />
            <strong>Service</strong> refers to the Website.
            <br />
            <strong>You</strong> means the individual or legal entity accessing
            the Service.
          </p>

          <h2>Collecting and Using Your Personal Data</h2>
          <h3>Types of Data Collected</h3>

          <p>
            <b>Personal Data</b>
          </p>
          <p>
            We may collect identifying information such as:
            <ul className="list">
              <li>Email address</li>
              <li>First and last name</li>
              <li>Phone number</li>
              <li>Address, State, City, ZIP/Postal code</li>
            </ul>
          </p>

          <h3>Usage Data</h3>
          <p>
            Usage Data may include Your IP address, browser details, pages
            visited, time spent on the Service, and other analytics data.
          </p>

          <h2>Tracking Technologies & Cookies</h2>
          <p>
            We use Cookies and tracking tools such as web beacons to improve the
            Service. You may disable Cookies in your browser settings; however,
            some features may not function properly.
          </p>

          <h2>Use of Your Personal Data</h2>
          <p>
            We may use Your Personal Data for:
            <ul className="list">
              <li>Providing and maintaining the Service</li>
              <li>Managing Your account</li>
              <li>Communicating updates and improvements</li>
              <li>Security and fraud prevention</li>
              <li>Business analysis and performance improvement</li>
            </ul>
          </p>

          <h2>Disclosure of Your Personal Data</h2>
          <p>
            We may disclose data in case of business acquisition, legal
            obligations, protection against fraud, or user security concerns.
          </p>

          <h2>Security of Your Personal Data</h2>
          <p>
            We strive to use commercially approved means to protect Your
            Personal Data, though no system is 100% secure.
          </p>

          <h2>Children’s Privacy</h2>
          <p>
            We do not knowingly collect data from anyone under 13. If such
            information is discovered, we take immediate action to remove it.
          </p>

          <h2>Links to Other Websites</h2>
          <p>
            External websites are not controlled by Us. We recommend reviewing
            their privacy policies.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Please check
            back periodically. Updates become effective when posted.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, you can contact
            us:
            <br />
            📧 Email:{" "}
            <a href="mailto:angelsxsocial@gmail.com">angelsxsocial@gmail.com</a>
            <br />
            🌐 Website:{" "}
            <a
              href="https://angelx.exchange/"
              target="_blank"
              rel="noreferrer"
            >
              https://angelx.exchange/
            </a>
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
