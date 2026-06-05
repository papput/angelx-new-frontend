import React from "react";
import Link from "next/link";
import "./RefundPolicy.css";
import BackHeader from "./BackHeader";

const RefundPolicy = () => {
  return (
    <div className="privacy-container">
      <BackHeader title="Refund Policy" link="/exchange" />

      <section className="privacy-box">
        <h1>Refund Policy</h1>
        <p className="last-updated">Last Updated: June 5, 2026</p>

        <p>
          This Refund Policy describes how AngelX Exchange handles refunds for
          USDT exchange transactions and related services on the AngelX Platform
          and AngelX App.
        </p>

        <h2>USDT Exchange Transactions</h2>
        <p>
          Once a USDT to INR exchange is confirmed and processed on AngelX
          Exchange, the transaction is generally final. USDT balances are
          deducted at the time of exchange confirmation and INR settlement is
          initiated to your linked bank account.
        </p>

        <h2>Deposit-Related Refunds</h2>
        <p>
          If a USDT deposit is not credited due to an error attributable to
          AngelX Exchange, contact support with your transaction ID. Verified
          errors may result in a refund or credit to your AngelX account balance.
        </p>

        <h2>Failed or Rejected Transactions</h2>
        <p>
          If a USDT exchange is rejected by AngelX before processing, your
          USDT balance will be restored to your AngelX Platform account. No INR
          transfer will be initiated for rejected transactions.
        </p>

        <h2>Withdrawal Issues</h2>
        <p>
          If a USDT withdrawal fails due to platform error, AngelX will
          investigate and restore the USDT balance if the withdrawal was not
          completed on the blockchain.
        </p>

        <h2>Refund Processing Time</h2>
        <p>
          Approved refunds are typically processed within 3–7 business days.
          Bank settlement times may vary depending on your financial institution.
        </p>

        <h2>How to Request a Refund Review</h2>
        <p>
          Contact AngelX support via{" "}
          <Link href="/contact-us">our contact page</Link> or email with your
          registered phone number, transaction ID, and a description of the
          issue.
        </p>

        <h2>Related Policies</h2>
        <p>
          Please also review our{" "}
          <Link href="/terms-conditions">Terms &amp; Conditions</Link>,{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>, and{" "}
          <Link href="/disclaimer">Disclaimer</Link>.
        </p>

        <h2>Contact Us</h2>
        <p>
          📧 Email:{" "}
          <a href="mailto:angelsxsocial@gmail.com">angelsxsocial@gmail.com</a>
          <br />
          🌐 Website:{" "}
          <a href="https://angelx.exchange/" target="_blank" rel="noreferrer">
            https://angelx.exchange/
          </a>
        </p>
      </section>
    </div>
  );
};

export default RefundPolicy;
