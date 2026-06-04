import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";
import api from "../api/axios";
import "./SelectWalletAddress.css";

import trc20Icon from "../assets/trc20.png";
import usdtIcon from "../assets/USDT_Logo.png";
import Toast from "../components/Toast";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

import BackHeader from "./BackHeader";

import select from "../assets/exchange/bank_select.png";
import unselect from "../assets/exchange/bank_un_select.png";
import deleteIcon from "../assets/exchange/bank_delete.png";
import empty from "../assets/base/empty.png";
import LoaderSmall from "./LoaderSmall";
import Header from "./Header";

export default function SelectWalletAddress() {
  const router = useRouter();

  const [wallets, setWallets] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const [modal, setModal] = useState({ open: false, id: null, acc: "" });

  /* ✅ Toast helper */
  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 25);
  };

  /* ✅ Fetch wallets */
  const fetchWallets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/wallet/list");

      if (!res.data?.success) {
        triggerToast("Failed to load wallets");
        return;
      }

      const list = res.data.data.wallets || [];
      setWallets(list);

      const stored = localStorage.getItem("selectedWallet");

      // Default selected wallet logic
      if (stored && list.find((w) => w.walletAddress === stored)) {
        setSelected(stored);
      } else if (list.length > 0) {
        const lastWallet = list[0].walletAddress; // newest first
        setSelected(lastWallet);
        localStorage.setItem("selectedWallet", lastWallet);
      }

      if (list.length === 0) {
        triggerToast("No wallets found. Please add one.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch wallets";
      triggerToast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  /* ✅ Handle wallet select */
  const handleSelect = (addr) => {
    setSelected(addr);
    localStorage.setItem("selectedWallet", addr);
    triggerToast("Wallet selected");
    setTimeout(() => router.push("/withdraw-usdt"), 600);
  };

  /* ✅ Handle delete */
  const askDelete = (wallet) => {
    setModal({
      open: true,
      id: wallet._id,
      acc: wallet.walletAddress,
    });
  };

  const confirmDelete = async () => {
    try {
      if (!modal.id) return;
      await api.delete(`/wallet/${modal.id}`);
      triggerToast("Wallet deleted successfully");
      setModal({ open: false, id: null, acc: "" });
      fetchWallets();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete wallet";
      triggerToast(msg);
      setModal({ open: false, id: null, acc: "" });
    }
  };

  /* ✅ UI */
  return (
    <div className="select-wallet-page">
      {/* Header */}

      {/* <div
        className=""
        style={{
          padding: "0px 16px",
          position: "fixed",
          top: "0",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <BackHeader title="Select wallet address" />
      </div> */}
      <Header
        title="Select wallet address"
        showBack
        showBackLink="/withdraw-usdt"
        // showHistory
        // historyLink="/exchange/list"
      />

      {/* Wallet List */}
      {loading ? (
        <LoaderSmall show={true} />
      ) : wallets.length === 0 ? (
        <div className="bl-empty">
          <AppImage src={empty} className="empty" alt="" /> Empty
          {/* <a className="bl-add" href="/add-bank-account">
              + Add bank account
            </a> */}
        </div>
      ) : (
        <div className="wallet-list">
          {wallets.map((wallet) => (
            <div key={wallet._id} className="wallet-card">
              <div
                className="wallet-left"
                onClick={(e) => {
                  if (!e.target.closest(".delete-icon"))
                    handleSelect(wallet.walletAddress);
                }}
              >
                <AppImage src={trc20Icon} alt="trc20" className="network-icon" />
                <div className="wallet-info">
                  <div className="wallet-title">
                    TRC20–USDT
                    <AppImage src={usdtIcon} alt="usdt" className="usdt-small" />
                  </div>
                  <div className="wallet-address">{wallet.walletAddress}</div>
                </div>
              </div>

              <div className="wallet-right">
                <div className="blsw-right">
                  <AppImage
                    src={selected === wallet.walletAddress ? select : unselect}
                    className="blsw-select-icon"
                    // onClick={() => {
                    //   localStorage.setItem("selected_bank_id", m._id);
                    //   selectMethod(m);
                    // }}
                    alt=""
                  />
                </div>

                {/* {selected === wallet.walletAddress ? (
                  <div className="circle checked">✔</div>
                ) : (
                  <div className="circle" />
                )} */}
              </div>

              <div className="wallet-footer">
                <span className="create-time">
                  Create time:{" "}
                  {new Date(wallet.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>

                <button
                  className="bl-delete-btn"
                  onClick={() => askDelete(wallet)}
                >
                  <AppImage src={deleteIcon} className="bl-delete-icon" alt="" />
                </button>

                {/* <span
                  className="delete-icon"
                  onClick={() => askDelete(wallet)}
                >
                  🗑️
                </span> */}
              </div>
            </div>
          ))}
          <div className="no-more">No more data</div>
        </div>
      )}

      {/* Fixed Add Wallet Button */}
      <div className="fixed-bottom">
        <button
          className="add-wallet-btn"
          onClick={() => router.push("/withdraw/bind/bankCard")}
        >
          +Add wallet address
        </button>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={modal.open}
        accountNo={modal.acc}
        onClose={() => setModal({ open: false, id: null, acc: "" })}
        onConfirm={confirmDelete}
      />

      {/* Toast */}
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
