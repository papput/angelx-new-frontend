const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "src", "app");

const publicPages = [
  { route: "", component: "Home" },
  { route: "exchange", component: "Exchange" },
  { route: "about-us", component: "AboutUs" },
  { route: "contact-us", component: "ContactUs" },
  { route: "disclaimer", component: "Disclaimer" },
  { route: "refund-policy", component: "RefundPolicy" },
  { route: "privacy-policy", component: "PrivacyPolicy" },
  { route: "terms-conditions", component: "TermsConditions" },
  { route: "login", component: "Login" },
];

const protectedPages = [
  { route: "sell-usdt", component: "SellUSDT", suspense: true },
  { route: "add-bank-account", component: "BankForm" },
  { route: "bank-card/list", component: "BankList" },
  { route: "exchange/list", component: "ExchangeHistory" },
  { route: "transaction-details", component: "TransactionDetails", suspense: true },
  { route: "deposit-usdt", component: "DepositUSDT" },
  { route: "deposit/list", component: "DepositHistory" },
  { route: "recharge/detail", component: "DepositRecharge", suspense: true },
  { route: "withdraw-usdt", component: "WithdrawUSDT" },
  { route: "withdraw-history", component: "WithdrawHistory" },
  { route: "withdraw/bankCard/list", component: "SelectWalletAddress" },
  { route: "withdraw/bind/bankCard", component: "WithdrawWalletAddress" },
  { route: "reset-transaction-password", component: "ResetTransactionPassword" },
  { route: "setting", component: "Settings" },
  { route: "invite", component: "InviteFriends" },
  { route: "referrel", component: "ReferralsPage" },
];

function makePage(component, protectedRoute, suspense) {
  const imports = [
    `import ${component} from "@/components/${component}";`,
  ];
  if (protectedRoute) {
    imports.push(`import ProtectedRoute from "@/components/ProtectedRoute";`);
  }
  if (suspense) {
    imports.push(`import { Suspense } from "react";`);
    imports.push(`import Loader from "@/components/Loader";`);
  }

  const inner = protectedRoute
    ? `<ProtectedRoute><${component} /></ProtectedRoute>`
    : `<${component} />`;

  const body = suspense
    ? `<Suspense fallback={<Loader />}>${inner}</Suspense>`
    : inner;

  return `"use client";

${imports.join("\n")}

export default function Page() {
  return (
    ${body}
  );
}
`;
}

publicPages.forEach(({ route, component }) => {
  const dir = route ? path.join(APP_DIR, route) : APP_DIR;
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "page.js");
  fs.writeFileSync(file, makePage(component, false, false));
});

protectedPages.forEach(({ route, component, suspense }) => {
  const dir = path.join(APP_DIR, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.js"), makePage(component, true, suspense));
});

// Catch-all fallback -> Home
const catchAllDir = path.join(APP_DIR, "[...slug]");
fs.mkdirSync(catchAllDir, { recursive: true });
fs.writeFileSync(
  path.join(catchAllDir, "page.js"),
  `import Home from "@/components/Home";

export default function CatchAllPage() {
  return <Home />;
}
`
);

console.log("Generated App Router pages.");
