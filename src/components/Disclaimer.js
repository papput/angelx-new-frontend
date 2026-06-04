import React from "react";
import "./Disclaimer.css";
import BackHeader from "./BackHeader";
import PageMeta from "./PageMeta";

const Disclaimer = () => {
  return (
    <>
      <PageMeta
        title="Disclaimer – AngelX Exchange"
        description="Read the disclaimer for AngelX Exchange, including important information about trading risks, platform terms, and user responsibilities."
        keywords="AngelX disclaimer, AngelX exchange risk, USDT trading disclaimer"
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        canonical="https://angelx.exchange/disclaimer"
      />
      <div className="disclaimer-container">
        <BackHeader title="Disclaimer" link="/exchange" />

        <section className="disclaimer-box">
          <h1>Disclaimer</h1>
          <p className="last-updated">Last updated: October 29, 2025</p>

          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words whose initial letters are capitalized have meanings
            defined under the following conditions. The definitions shall have
            the same meaning regardless of whether they appear in singular or
            plural.
          </p>

          <h3>Definitions</h3>
          <p>
            For the purposes of this Disclaimer:
            <br />
            <b>Company</b> (referred to as "the Company", "We", "Us" or "Our")
            refers to https://angelx.exchange/.
            <br />
            <b>Service</b> refers to the Website.
            <br />
            <b>You</b> means the individual or legal entity accessing the
            Service.
            <br />
            <b>Website</b> refers to https://angelx.exchange/, accessible
            via the same.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The information contained on the Service is for general information
            purposes only. The Company assumes no responsibility for errors or
            omissions in the contents of the Service.
          </p>
          <p>
            In no event shall the Company be liable for any direct, indirect,
            incidental, consequential, or any other damages arising out of or in
            connection with the use of the Service.
          </p>
          <p>
            We reserve the right to make changes to the Service at any time
            without prior notice.
          </p>

          <h2>External Links Disclaimer</h2>
          <p>
            The Service may contain links to third-party websites not owned or
            controlled by the Company. We do not guarantee the accuracy or
            completeness of any external content.
          </p>

          <h2>Errors and Omissions Disclaimer</h2>
          <p>
            The content provided is for general guidance only. We aim to keep
            information accurate, but errors may occur, and laws or regulations
            may change.
          </p>

          <h2>Fair Use Disclaimer</h2>
          <p>
            Some copyrighted material may be used without explicit authorization
            for purposes such as teaching, research, or commentary under "fair
            use". If you wish to use any material beyond fair use, please seek
            permission from the owner.
          </p>

          <h2>Views Expressed Disclaimer</h2>
          <p>
            The views or opinions expressed on the Service belong to the authors
            and do not reflect official policy of the Company.
          </p>

          <h2>No Responsibility Disclaimer</h2>
          <p>
            Information here should not be considered legal, tax, or
            professional advice. We recommend consulting professional advisors.
          </p>

          <h2>"Use at Your Own Risk" Disclaimer</h2>
          <p>
            All content on the Service is provided "as is", without any
            guarantee of accuracy or completeness. The Company will not be
            responsible for actions taken based on this information.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Disclaimer, you can contact us
            by visiting: <br />
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

export default Disclaimer;
