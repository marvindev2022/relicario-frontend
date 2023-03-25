import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { notifyError, notifySucess } from "../../../utils/notifications";
import "./styles.css";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  cpf: "",
  street: "",
  streetNumber: "",
  complement: "",
  cep: "",
  date: "",
  phone: "",
  state: "",
  city: "",
  bairro: "",
};

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...defaultForm });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (
        !form.name ||
        !form.confirmPassword ||
        !form.email ||
        !form.password ||
        !form.cpf ||
        !form.street ||
        !form.streetNumber ||
        !form.complement ||
        !form.cep ||
        !form.date ||
        !form.phone ||
        !form.state ||
        !form.city ||
        !form.bairro
      ) {
        console.log(form);
        return notifyError("Todos os campos são obrigatórios.");
      }

      if (form.password !== form.confirmPassword) {
        return notifyError("As senhas precisam ser iguais.");
      }

      const response = await api.post("/usuario", {
        nome: form.name,
        email: form.email,
        senha: form.password,
        cpf: form.cpf,
        logradouro: form.street,
        numero: form.streetNumber,
        complemento: form.complement,
        cep: form.cep,
        data_nascimento: form.date,
        telefone: form.phone,
        estado: form.state,
        cidade: form.city,
        bairro: form.bairro,
      });
      console.log(response);
      if (response.status > 204) {
        return notifyError(response.data);
      }

      notifySucess("Cadastro realizado.");

      navigate("/");
    } catch (error) {
      notifyError(error.response.data.mensagem);
    }
  }

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  return (
    <div className="container-sign-up">

      <div className="content-sign-up">
        <form onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>

          <div className="container-inputs">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChangeForm}
            />
          </div>

          <div className="container-inputs">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">CEP</label>
            <input
              type="number"
              name="cep"
              value={form.cep}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">Estado </label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">Cidade </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">Bairro</label>
            <input
              type="text"
              name="bairro"
              value={form.bairro}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">Logradouro</label>
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">N°</label>
            <input
              type="number"
              name="streetNumber"
              value={form.streetNumber}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="">Complementos</label>
            <input
              type="text"
              name="complement"
              value={form.complement}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="cpf">Cpf</label>
            <input
              type="number"
              name="cpf"
              value={form.cpf}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="">Data Nascimento</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChangeForm}
            />
          </div>

          <div className="container-inputs">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChangeForm}
            />
          </div>

          <div className="container-inputs">
            <label htmlFor="confirm-password">Confirmação de senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChangeForm}
            />
          </div>

          <button className="btn-purple btn-big">Cadastrar</button>

          <Link to="/">Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
