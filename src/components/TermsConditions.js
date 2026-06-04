import React from "react";
import "./TermsConditions.css";
import BackHeader from "./BackHeader";
import PageMeta from "./PageMeta";

const TermsConditions = () => {
  return (
    <>
      <PageMeta
        title="Terms & Conditions – AngelX Exchange"
        description="Read the Terms and Conditions for AngelX Exchange, covering user responsibilities, platform usage rules, and legal agreements for USDT to INR trading."
        keywords="AngelX terms, AngelX conditions, AngelX exchange terms of service, USDT trading terms"
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        canonical="https://angelx.exchange/terms&conditions"
      />
      <div className="terms-container">
        <BackHeader title="Terms & Conditions" link="/exchange" />

        <section className="terms-box">
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Last updated: October 29, 2025</p>

          <p>
            Please read these terms and conditions carefully before using Our
            Service.
          </p>

          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words whose initial letters are capitalized have meanings
            defined under these conditions. These definitions apply regardless
            of singular or plural usage.
          </p>

          <h3>Definitions</h3>
          <p>
            For the purposes of these Terms and Conditions:
            <br />
            <strong>Affiliate</strong> – Controls or is controlled by another
            entity (50%+ ownership).
            <br />
            <strong>Country</strong> – Refers to United Arab Emirates.
            <br />
            <strong>Company</strong> (“We”, “Us”, or “Our”) – Refers to
            https://angelx.exchange/.
            <br />
            <strong>Device</strong> – Any device used to access the Service.
            <br />
            <strong>Service</strong> – Refers to the Website.
            <br />
            <strong>Terms</strong> – This Terms & Conditions agreement.
            <br />
            <strong>You</strong> – Individual or legal entity using the Service.
          </p>

          <h2>Acknowledgment</h2>
          <p>
            These Terms govern your use of the Service and form the agreement
            between You and the Company. By accessing or using the Service, You
            agree to comply with these Terms. If You disagree, please do not use
            the Service. You must be at least 18 years old to access the
            Service.
          </p>
          <p>
            Your use of the Service is also subject to our{" "}
            <strong>Privacy Policy</strong>. Please read it carefully.
          </p>

          <h2>Links to Other Websites</h2>
          <p>
            Our Service may contain links to external sites not operated by Us.
            We are not responsible for the content or privacy practices of
            third-party websites. We strongly recommend reviewing their policies
            before use.
          </p>

          <h2>Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access immediately
            without prior notice if Terms are violated. Upon termination, your
            access to the Service ceases immediately.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Our liability is limited to the amount You paid through the Service
            or 100 USD if no purchase was made. We are not liable for indirect
            or consequential damages including loss of profits, data, or
            privacy.
          </p>

          <h2>"AS IS" and "AS AVAILABLE" Disclaimer</h2>
          <p>
            The Service is provided without warranties of any kind. We make no
            guarantee that it will operate error-free, meet expectations, or be
            entirely secure from harmful components.
          </p>

          <h2>Governing Law</h2>
          <p>
            The laws of the United Arab Emirates apply, excluding conflict of
            law principles.
          </p>

          <h2>Disputes Resolution</h2>
          <p>
            You agree to attempt informal resolution before pursuing legal
            action.
          </p>

          <h2>United States Legal Compliance</h2>
          <p>
            You confirm You are not located in restricted countries or listed on
            prohibited party lists.
          </p>

          <h2>Severability and Waiver</h2>
          <p>
            If any part of these Terms is held invalid, remaining provisions
            continue to apply. A failure to enforce any right does not
            constitute a waiver.
          </p>

          <h2>Translation Interpretation</h2>
          <p>
            If these Terms appear in other languages, the English version
            prevails.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update the Terms at our discretion. For major changes, we
            will attempt to notify You at least 30 days prior. Continued use of
            the Service after updates means You accept the revised terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms and Conditions:
            <br />
            📧 Email:{" "}
            <a href="mailto:angelsxsocial@gmail.com">angelsxsocial@gmail.com</a>
            <br />
            🌐 Website:{" "}
            <a
              href="https://angelx.exchange"
              target="_blank"
              rel="noreferrer"
            >
              https://angelx.exchange
            </a>
          </p>
        </section>
      </div>
    </>
  );
};

export default TermsConditions;
