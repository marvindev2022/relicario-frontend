import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifyError, notifySucess } from "./../../../utils/notifications";
import api from "./../../../services/api";
import "./styles.css";

const defaultForm = {
  name: null,
  email: null,
  password: null,
  confirmPassword: null,
  cpf: null,
  street: null,
  streetNumber: null,
  complement: null,
  cep: null,
  date: null,
  phone: null,
  state: null,
  city: null,
  bairro: null,
};

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...defaultForm });
  const estados = [
    { sigla: "AC", nome: "Acre" },
    { sigla: "AL", nome: "Alagoas" },
    { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (
        !form.name ||
        !form.email ||
        !form.cpf ||
        !form.password ||
        !form.confirmPassword ||
        !form.street ||
        !form.complement ||
        !form.cep ||
        !form.date ||
        !form.phone ||
        !form.state ||
        !form.city ||
        !form.bairro
      ) {
        return notifyError("Todos os campos são obrigatórios.");
      }

      if (form.password !== form.confirmPassword) {
        return notifyError("As senhas precisam ser iguais.");
      }

      const response = await api.post("/usuario", {
        nome: form.name,
        email: form.email,
        senha: form.password,
        cpf: form.cpf.replace(/\D/g, ""),
        logradouro: form.street,
        numero: form.streetNumber,
        complemento: form.complement,
        cep: form.cep.replace(/\D/g, ""),
        data_nascimento: form.date,
        telefone: form.phone.replace(/\D/g, ""),
        estado: form.state,
        cidade: form.city,
        bairro: form.bairro,
      });
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
              placeholder="Seu Nome"
              value={form.name}
              onChange={handleChangeForm}
            />
          </div>

          <div className="container-inputs">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              placeholder="meu@email.com"
              value={form.email}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">CEP</label>
            <input
              type="text"
              name="cep"
              placeholder="xx.xxx-xxx"
              value={form.cep?.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1.$2-$3")}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label>Estado</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChangeForm}
              required
            >
              <option value="">Selecione</option>
              {estados.map((estado) => (
                <option key={estado.sigla} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="container-inputs">
            <label htmlFor="street">Cidade </label>
            <input
              type="text"
              name="city"
              placeholder="Sua cidade"
              value={form.city}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">Bairro</label>
            <input
              type="text"
              name="bairro"
              placeholder="Seu bairro"
              value={form.bairro}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">Logradouro</label>
            <input
              type="text"
              name="street"
              placeholder="Rua y"
              value={form.street}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="street">N°</label>
            <input
              type="number"
              name="streetNumber"
              placeholder="59"
              value={form.streetNumber}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="">Complementos</label>
            <input
              type="text"
              name="complement"
              placeholder="Casa x"
              value={form.complement}
              onChange={handleChangeForm}
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="cpf">Cpf</label>
            <input
              type="text"
              name="cpf"
              placeholder="xxx.xxx.xxx-xx"
              value={form.cpf?.replace(
                /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
                "$1.$2.$3-$4"
              )}
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
              placeholder="(xx) x xxxx-xxxx"
              value={form.phone?.replace(
                /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
                "($1) $2 $3-$4"
              )}
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

          <Link to="/sign-in">Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
