import {
  useEffect,
  useState,
} from "../../../../build/node_modules/@types/react";
import api from "../../../services/api";
// import { formatToMoney } from "../../utils/formatters";
import { notifyError } from "../../../utils/notifications";
import { getItem } from "../../../utils/storage";
import "./styles.css";

function Resume({ transactions }) {
  const [extract, setExtract] = useState({
    in: 0,
    out: 0,
    balance: 0,
  });

  useEffect(() => {
    const token = getItem("token");

    async function loadExtract() {
      try {
        const response = await api.get("/transacao/extrato", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 204) {
          return notifyError(response.data);
        }

        setExtract({
          in: "em criação",
          out: "em criação",
          balance: "em criação",
        });
      } catch (error) {
        notifyError(error.response.data);
      }
    }

    loadExtract();
  }, [transactions]);

  return (
    <div className="container-resume">
      <h1>Resumo</h1>
      <div className="line-resume">
        <span>Entradas</span>
        <span className="in">{extract.in}</span>
      </div>
      <div className="line-resume">
        <span>Saídas</span>
        <span className="out">{extract.out}</span>
      </div>
      <div className="horizontal-line"></div>
      <div className="line-resume">
        <h3>Saldo</h3>
        <span className="resume">{extract.balance}</span>
      </div>
    </div>
  );
}

export default Resume;
