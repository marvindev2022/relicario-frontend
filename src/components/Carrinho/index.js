// import React, { Component } from "react";

// class CarrinhoDeCompras extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       produtos: [],
//       total: 0,
//     };
//   }

//   adicionarProduto = (produto) => {
//     let produtos = [...this.state.produtos];
//     let index = produtos.findIndex((p) => p.id === produto.id);
//     if (index !== -1) {
//       produtos[index].quantidade++;
//     } else {
//       produto.quantidade = 1;
//       produtos.push(produto);
//     }
//     let total = this.state.total + produto.preco;
//     this.setState({ produtos, total });
//   };

//   removerProduto = (produto) => {
//     let produtos = [...this.state.produtos];
//     let index = produtos.findIndex((p) => p.id === produto.id);
//     if (index !== -1) {
//       if (produtos[index].quantidade > 1) {
//         produtos[index].quantidade--;
//       } else {
//         produtos.splice(index, 1);
//       }
//       let total = this.state.total - produto.preco;
//       this.setState({ produtos, total });
//     }
//   };

//   render() {
//     return (
//       <div>
//         <h2>Carrinho de compras</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Produto</th>
//               <th>Preço unitário</th>
//               <th>Quantidade</th>
//               <th>Preço total</th>
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.produtos.map((produto) => (
//               <tr key={produto.id}>
//                 <td>{produto.nome}</td>
//                 <td>{produto.preco}</td>
//                 <td>{produto.quantidade}</td>
//                 <td>{produto.quantidade * produto.preco}</td>
//                 <td>
//                   <button onClick={() => this.adicionarProduto(produto)}>
//                     +
//                   </button>
//                   <button onClick={() => this.removerProduto(produto)}>
//                     -
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="3">Total:</td>
//               <td>{this.state.total}</td>
//               <td></td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     );
//   }
// }

// export default CarrinhoDeCompras;

import React, { useState } from "react";

function CarrinhoDeCompras() {
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);

  const adicionarProduto = (produto) => {
    let index = produtos.findIndex((p) => p.id === produto.id);
    if (index !== -1) {
      let produtosAtualizados = [...produtos];
      produtosAtualizados[index].quantidade++;
      setProdutos(produtosAtualizados);
    } else {
      produto.quantidade = 1;
      setProdutos([...produtos, produto]);
    }
    setTotal(total + produto.preco);
  };

  const removerProduto = (produto) => {
    let index = produtos.findIndex((p) => p.id === produto.id);
    if (index !== -1) {
      if (produtos[index].quantidade > 1) {
        let produtosAtualizados = [...produtos];
        produtosAtualizados[index].quantidade--;
        setProdutos(produtosAtualizados);
      } else {
        setProdutos(produtos.filter((p) => p.id !== produto.id));
      }
      setTotal(total - produto.preco);
    }
  };

  return (
    <div>
      <h2>Carrinho de compras</h2>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço unitário</th>
            <th>Quantidade</th>
            <th>Preço total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.quantidade * produto.preco}</td>
              <td>
                <button onClick={() => adicionarProduto(produto)}>+</button>
                <button onClick={() => removerProduto(produto)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td>{total}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CarrinhoDeCompras;
