import { useEffect, useState } from "react";
import "./style.css";
import Header from "../../../components/admin/HeaderADM";
import Filter from "../../../components/admin/Filter";
import Table from "../../../components/admin/Table";
import AddProductsModal from "../../../components/admin/AddProductsModal";
import EditProductsModal from "../../../components/admin/EditProductsModal";
import Resume from "../../../components/admin/Resume";
import ProfileModal from "../../../components/admin/ProfileModalADM";
import { loadProducts } from "../../../utils/requisitions";

function MainADM() {
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalAddProduct, setOpenModalAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [currentItemToEdit, setCurrentItemToEdit] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await loadProducts();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className="container-mainADM">
      <Header handleEditProfile={() => setOpenModalProfile(true)} />
      <section>
        <div className="width-limit">
          <div className="container-data">
            <div className="container-left">
              <Filter products={products} setProducts={setProducts} />
              <Table
                products={products}
                setProducts={setProducts}
                setOpenModalEdit={setOpenModalEdit}
                setCurrentItemToEdit={setCurrentItemToEdit}
              />
            </div>
            <div className="container-right">
              <Resume products={products} />
              <button
                className="btn-purple btn-small"
                onClick={() => setOpenModalAddProduct(true)}
              >
                Adicionar Produto
              </button>
            </div>
          </div>
        </div>
      </section>
      <AddProductsModal
        open={openModalAddProduct}
        handleClose={() => setOpenModalAddProduct(false)}
        setProducts={setProducts}
      />
      <EditProductsModal
        open={openModalEdit}
        setProducts={setProducts}
        handleClose={() => setOpenModalEdit(false)}
        currentItemToEdit={currentItemToEdit}
      />
      <ProfileModal
        open={openModalProfile}
        handleClose={() => setOpenModalProfile(false)}
      />
    </div>
  );
}

export default MainADM;
