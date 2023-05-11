import lupa from "./../../../assets/lupa.png";
import "./styles.css";
export default function Home() {
  return (
    <main className="main-home">
      <header className="header-home">
   <div className="container-header">
        <span className="container-input-search">
          <img className="lupa" src={lupa} alt="lupa" />
          <input className="input-search" placeholder="Malbec" type="search" />
        </span>
        </div>
      </header>
      <section className="container-options-user">
        <div className="container-home-options">Pedidos</div>
        <div className="container-home-options">Trocas e Devoluções</div>
        <div className="container-home-options">Favoritos</div>
        <div className="container-home-options">Cupons</div>
        <div className="container-home-options">Dados Pessoais</div>
        <div className="container-home-options">Endereços</div>
        <div className="container-home-options">Pagamentos</div>
      </section>
      <button className="btn-exit-home">Sair</button>
    </main>
  );
}
