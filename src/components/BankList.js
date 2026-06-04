// src/pages/BankList.jsx
import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import api from "../api/axios";
import { saveSelectedMethod } from "../utils/storage";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import BackHeader from "./BackHeader";

import select from "../assets/exchange/bank_select.png";
import unselect from "../assets/exchange/bank_un_select.png";
import deleteIcon from "../assets/exchange/bank_delete.png";
import empty from "../assets/base/empty.png";

import "./BankList.css";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import Header from "./Header";

export default function BankList() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null, acc: "" });

  const fetchMethods = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/exchange/methods");
      setMethods(data?.data?.methods || []);
    } catch (e) {
      // Handle error UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);
  const router = useRouter();
  const selectMethod = (m) => {
    saveSelectedMethod(m);
    // return to previous page
    setTimeout(() => {
      router.push("/sell-usdt");
    }, 200);
  };

  const askDelete = (m) =>
    setModal({ open: true, id: m._id, acc: m.accountNo });

  const confirmDelete = async () => {
    try {
      await api.delete(`/exchange/methods/${modal.id}`);
      setModal({ open: false, id: null, acc: "" });
      fetchMethods();
    } catch (e) {
      setModal({ open: false, id: null, acc: "" });
      // optionally toast error
    }
  };

  return (
    <>
      <Header title="Select Bank Account" showBack showBackLink="/sell-usdt" />

      <div className={loading ? `banklist-page` : `banklist-page bg_white`}>
        {loading ? (
          <Loader show={true} />
        ) : methods.length === 0 ? (
          <div className="bl-empty">
            <AppImage src={empty} className="empty" alt="" /> Empty
            {/* <a className="bl-add" href="/add-bank-account">
              + Add bank account
            </a> */}
          </div>
        ) : (
          <>
            {methods.map((m) => {
              const selectedId = localStorage.getItem("selected_bank_id");
              const isSelected = selectedId === m._id;

              return (
                <div key={m._id} className="bl-card">
                  <div className="bl-top">
                    {/* Avatar */}
                    <div className="bl-avatar">{(m.accountName || "?")[0]}</div>

                    {/* Bank Info */}
                    <div className="bl-info">
                      <div className="bl-acc">
                        Account No: <strong>{m.accountNo}</strong>
                      </div>
                      <div className="bl-ifsc">IFSC: {m.ifscCode}</div>
                      <div className="bl-name">
                        Account Name: {m.accountName}
                      </div>
                    </div>

                    {/* Right Select Icon */}
                    <div className="bl-right">
                      <AppImage
                        src={isSelected ? select : unselect}
                        className="bl-select-icon"
                        onClick={() => {
                          localStorage.setItem("selected_bank_id", m._id);
                          selectMethod(m);
                        }}
                        alt=""
                      />
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="bl-bottom">
                    <div className="bl-time">
                      Create time: {new Date(m.createdAt).toLocaleString()}
                    </div>

                    <button
                      className="bl-delete-btn"
                      onClick={() => askDelete(m)}
                    >
                      <AppImage src={deleteIcon} className="bl-delete-icon" alt="" />
                    </button>
                  </div>
                </div>
              );
            })}

            <p className="bl-nomore">No more data</p>
            <div className="add-fixed">
              <a href="/add-bank-account">+Add bank account</a>
            </div>
          </>
        )}

        <DeleteConfirmModal
          open={modal.open}
          accountNo={modal.acc}
          onClose={() => setModal({ open: false, id: null, acc: "" })}
          onConfirm={confirmDelete}
        />
      </div>
    </>
  );
}
