import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext, Link } from "react-router-dom";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];

}

function List() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  const { search } = useOutletContext<{ search: string }>();

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Lỗi API: ", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Danh sách sản phẩm</h2>
      <div className="row">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <Link
                  to={`/products/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="card-img-top p-3"
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-truncate">
                      {product.description}
                    </p>
                  </div>
                </Link>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    style={{ margin: "15px" }}
                    className="btn btn-primary"
                  >
                    Mua ngay
                  </button>
                  <button
                    style={{ margin: "15px" }}
                    className="btn btn-outline-success"
                  >
                    Add cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Không tìm thấy sản phẩm nào</p>
        )}
      </div>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default List;
