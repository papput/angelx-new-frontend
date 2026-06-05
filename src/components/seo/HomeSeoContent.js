import Link from "next/link";
import JsonLd from "./JsonLd";
import { faqPageSchema, reviewSchema } from "@/lib/seo/schemas";
import { FAQ_ITEMS } from "@/lib/seo/faqs";
import "./HomeSeoContent.css";

const HOMEPAGE_FAQS = FAQ_ITEMS.slice(0, 8);

export default function HomeSeoContent() {
  return (
    <section className="home-seo-content" aria-label="About AngelX Exchange">
      <JsonLd data={[faqPageSchema(HOMEPAGE_FAQS), reviewSchema()]} />

      <div className="home-seo-inner">
        <h2>What is AngelX Exchange?</h2>
        <p>
          <strong>AngelX Exchange</strong> is India&apos;s trusted{" "}
          <strong>USDT trading platform</strong> and{" "}
          <strong>digital asset exchange</strong> built for converting{" "}
          <strong>USDT to INR</strong> and <strong>INR to USDT</strong> with
          transparent rates and fast bank settlement. The{" "}
          <strong>AngelX Platform</strong> — accessible via the{" "}
          <strong>AngelX App</strong> and angelx.exchange — provides live{" "}
          <strong>AngelX USDT prices</strong>, multi-network USDT deposits, and
          secure digital asset transactions for users across India.
        </p>

        <h2>Why Users Choose AngelX</h2>
        <ul>
          <li>Real-time AngelX USDT price with automatic 60-second refresh</li>
          <li>Instant USDT to INR conversion with direct bank settlement</li>
          <li>Secure USDT exchange on a verified digital asset platform</li>
          <li>Easy-to-use AngelX App for mobile USDT trading</li>
          <li>Multi-network support: TRC20, ERC20, and BEP20</li>
          <li>Tiered user levels (Base, VIP, Gold) with preferential rates</li>
          <li>24/7 platform access with responsive AngelX support</li>
        </ul>

        <h2>USDT Exchange Process on AngelX</h2>
        <ol>
          <li>Sign in to AngelX with your phone number and OTP</li>
          <li>Add your Indian bank account for INR settlement</li>
          <li>Deposit USDT via TRC20, ERC20, or BEP20 network</li>
          <li>View the live AngelX USDT price on the platform</li>
          <li>Confirm your USDT to INR exchange order</li>
          <li>Receive INR directly in your linked bank account</li>
        </ol>

        <h2>Fast Settlement Benefits</h2>
        <p>
          AngelX Exchange prioritizes fast settlement for every USDT to INR
          transaction. After blockchain confirmation of your USDT deposit, the
          AngelX Platform processes your exchange and initiates INR bank
          transfer — typically within hours. The AngelX App lets you track
          settlement status in real time.
        </p>

        <h2>Platform Security</h2>
        <p>
          Security is foundational to AngelX. The platform uses phone-based OTP
          authentication, transaction password protection, blockchain-verified
          USDT deposits, and encrypted HTTPS connections. Every USDT exchange on
          AngelX Exchange is processed through secure digital asset infrastructure
          designed for reliable USDT trading.
        </p>

        <h2>Transparent AngelX USDT Rates</h2>
        <p>
          AngelX displays the exact USDT to INR rate before you confirm any
          transaction. No hidden fees — the AngelX USDT price shown at
          confirmation is the rate applied to your USDT exchange. VIP and Gold
          users on the AngelX Platform receive enhanced rates.
        </p>

        <h2>Referral Program</h2>
        <p>
          AngelX offers a referral program where users invite friends to the
          AngelX USDT Platform and earn rewards when referred users complete
          USDT exchange transactions. Access referrals from your AngelX App
          profile or the invite page.
        </p>

        <h2>Supported USDT Networks</h2>
        <table className="home-seo-table">
          <thead>
            <tr>
              <th>Network</th>
              <th>Standard</th>
              <th>Speed</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tron</td>
              <td>TRC20</td>
              <td>1-3 min</td>
              <td>Low fees, fast deposits</td>
            </tr>
            <tr>
              <td>Ethereum</td>
              <td>ERC20</td>
              <td>5-30 min</td>
              <td>Universal wallet support</td>
            </tr>
            <tr>
              <td>BNB Smart Chain</td>
              <td>BEP20</td>
              <td>1-5 min</td>
              <td>BSC ecosystem users</td>
            </tr>
          </tbody>
        </table>

        <h2>Platform Advantages</h2>
        <p>
          AngelX Exchange combines the simplicity of phone-based login with the
          power of a full USDT trading platform. Unlike complex international
          exchanges, AngelX is purpose-built for USDT to INR conversion in India
          — with local bank settlement, INR-focused support, and an AngelX App
          designed for Indian users.
        </p>

        <h2>AngelX vs Other USDT Platforms</h2>
        <table className="home-seo-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>AngelX Exchange</th>
              <th>Generic Platforms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USDT to INR focus</td>
              <td>Purpose-built</td>
              <td>Generic multi-asset</td>
            </tr>
            <tr>
              <td>INR bank settlement</td>
              <td>Direct transfer</td>
              <td>Often unavailable</td>
            </tr>
            <tr>
              <td>Live rate display</td>
              <td>60s auto-refresh</td>
              <td>Manual refresh</td>
            </tr>
            <tr>
              <td>Indian support</td>
              <td>WhatsApp + email</td>
              <td>Limited</td>
            </tr>
            <tr>
              <td>Mobile app</td>
              <td>Dedicated AngelX App</td>
              <td>Web only</td>
            </tr>
          </tbody>
        </table>

        <h2>What Users Say About AngelX</h2>
        <blockquote>
          &ldquo;Fast USDT to INR settlement with transparent AngelX rates. The
          AngelX App makes selling USDT simple.&rdquo; — Rahul M., Mumbai
        </blockquote>
        <blockquote>
          &ldquo;Reliable AngelX Exchange platform with quick bank transfers
          after USDT deposit. Best USDT trading platform I have used.&rdquo; —
          Priya S., Bangalore
        </blockquote>

        <h2>Download the AngelX App</h2>
        <p>
          Get the official AngelX App for Android to track AngelX USDT prices,
          manage USDT deposits, and complete USDT to INR exchanges from your
          phone. The AngelX App provides full parity with the AngelX Exchange
          website.
        </p>

        <h2>Trust &amp; Verification</h2>
        <p>
          AngelX Exchange operates as a verified digital asset platform with
          secure infrastructure, transparent pricing, and responsive customer
          support. Users can verify their transactions through the AngelX App
          transaction history and contact AngelX support for any account or
          settlement queries.
        </p>

        <h2>Frequently Asked Questions</h2>
        <dl className="home-seo-faq">
          {HOMEPAGE_FAQS.map((faq) => (
            <div key={faq.q}>
              <dt>{faq.q}</dt>
              <dd>{faq.a}</dd>
            </div>
          ))}
        </dl>
        <p>
          <Link href="/faq">View all 30+ AngelX FAQs →</Link>
        </p>

        <nav className="home-seo-links" aria-label="Related pages">
          <Link href="/about-us">About AngelX</Link>
          <Link href="/exchange">USDT Exchange</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/blogs">Blog</Link>
          <Link href="/blog">Guides</Link>
          <Link href="/contact-us">Contact</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-conditions">Terms</Link>
        </nav>
      </div>
    </section>
  );
}
