import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../../services/api';
import { notifyError } from './../../../utils/notifications';
import { getItem, setItem } from './../../../utils/storage';
import './styles.css';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = getItem('token');
    if (token) navigate('/main');
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password)
      return notifyError('Todos os campos são obrigatórios.');

    try {
      const response = await api.post('/login', { email, password });
      const { user, token } = response.data;
 console.log(response)
      setItem('token', token);
      setItem('userId', user.id);
      setItem('userName', user.nome);
      navigate('/main/');
    } catch (error) {
      notifyError(
        error.response?.data?.mensagem || 'Ocorreu um erro ao fazer login.',
      );
    }
  }

  return (
    <div className="container-sign-in">
      <div className="content-sign-in">
        <div className="left">
          <h3>
            "Uma <span>Mulher</span> com determinação é capaz de tudo. Não deixe
            ninguém lhe dizer o contrário."
          </h3>
          <button
            className="btn-big btn-purple"
            onClick={() => navigate('/sign-up')}
          >
            Cadastre-se
          </button>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="container-inputs">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button className="btn-big btn-purple">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
