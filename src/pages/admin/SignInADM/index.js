import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { notifyError } from "../../../utils/notifications";
import { getItem, setItem } from "../../../utils/storage";
import "./styles.css";

function SignInADM() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = getItem("tokenADM");
    if (token) navigate("/main/admcontroller");
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !password)
      return notifyError("Todos os campos são obrigatórios.");

    try {
      const response = await api.post("/login/admcontroller", { nome:name, senha: password });
      const { usuarioLogado, token } = response.data;

      setItem("tokenADM", token);
      setItem("admId", usuarioLogado.id);
      setItem("admName", usuarioLogado.nome);
      navigate("/main/admcontroller");
    } catch (error) {
      notifyError(
        error.response?.data?.mensagem || "Ocorreu um erro ao fazer login."
      );
    }
  }

  return (
    <div className="container-sign-in">
      <div>
        <h1 style={{color:"black",position:"absolute",top:"50px",left:"45%"}}className="h1">Relicario</h1>
      </div>
      <div className="content-sign-in">
        <div className="left">
          <h1>
            Controle suas <span>finanças</span> e impulsione seu <br />
            e-commerce com facilidade.
          </h1>
          <h3>
            "Uma mulher com determinação é capaz de tudo. Não deixe ninguém lhe
            dizer o contrário."
          </h3>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="container-inputs">
              <label htmlFor="email">Nome</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="container-inputs">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-purple btn-big">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInADM;
