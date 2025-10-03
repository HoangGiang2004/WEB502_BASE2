import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const phoneData: IProduct[] = [
  {
    id: 1,
    title: "iPhone 16 Pro Max",
    price: 33990000,
    description: "Flagship mới nhất của Apple với chip A18 Bionic, camera Pro Max.",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro.png"
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    price: 28990000,
    description: "Điện thoại cao cấp nhất của Samsung với bút S-Pen và camera 200MP.",
    image: "https://galaxydidong.vn/wp-content/uploads/2024/01/Samsung-Galaxy-S24-Ultra-5G-256GB.webp"
  },
  {
    id: 3,
    title: "Xiaomi 17 Pro Max",
    price: 4990000,
    description: "Điện thoại giá rẻ pin trâu, màn AMOLED, chip Snapdragon.",
    image: "https://cdn.viettablet.com/images/detailed/72/xiaomi-17-pro-max-3.jpg"
  },
  {
    id: 4,
    title: "Oppo Find X7 Pro",
    price: 18990000,
    description: "Camera đỉnh cao, thiết kế sang trọng, hiệu năng mạnh mẽ.",
    image: "https://cdn.mobilecity.vn/mobilecity-vn/images/2024/01/oppo-find-x7-ultra-xanh.jpg.webp"
  },
  {
    id: 5,
    title: "Vivo V30",
    price: 9990000,
    description: "Smartphone mỏng nhẹ với camera selfie siêu đẹp.",
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 6,
    title: "Realme 12 Pro+ 5G",
    price: 8990000,
    description: "Điện thoại tầm trung mạnh mẽ, hỗ trợ 5G.",
    image: "https://demobile.vn/wp-content/uploads/2024/03/realme-12-pro-plus.webp"
  },
  {
    id: 7,
    title: "Honor Magic 6 Pro",
    price: 22990000,
    description: "Smartphone cao cấp từ Honor với camera AI.",
    image: "https://cdn.viettablet.com/images/detailed/59/honor-magic6-pro-1.jpg"
  },
  {
    id: 8,
    title: "OnePlus 12R",
    price: 15990000,
    description: "Hiệu năng cao với Snapdragon 8 Gen 2, màn 120Hz.",
    image: "https://www.duchuymobile.com/images/detailed/66/oneplus-12r-den.jpg"
  },
  {
    id: 9,
    title: "iPhone 15 Pro Max",
    price: 33990000,
    description: "Flagship mới nhất của Apple với chip A17 Pro, camera Pro nâng cấp.",
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 10,
    title: "iPhone 14 Pro Max",
    price: 28990000,
    description: "Màn hình Super Retina XDR, Dynamic Island.",
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 11,
    title: "Samsung Galaxy S24 Ultra",
    price: 31990000,
    description: "Siêu phẩm Galaxy với camera cao cấp và S-Pen.",
    image: "https://galaxydidong.vn/wp-content/uploads/2024/01/Samsung-Galaxy-S24-Ultra-5G-256GB.webp"
  },
  {
    id: 12,
    title: "Samsung Galaxy Z Fold5",
    price: 42990000,
    description: "Điện thoại gập màn hình lớn, trải nghiệm tablet khi mở ra.",
    image: "https://thegioididongviets.com/wp-content/uploads/2024/07/samsung-galaxy-z-fold5-5g-f946-512gb-ram-12gb-chinh-hang-101690884773.jpg"
  },
  {
    id: 13,
    title: "Xiaomi 14 Ultra",
    price: 25990000,
    description: "Camera hợp tác Leica, hiệu năng mạnh mẽ.",
    image: "https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14-ultra_1__2.png"
  },
  {
    id: 14,
    title: "OPPO Find X7 Pro",
    price: 19990000,
    description: "Thiết kế sang, camera chất lượng cao.",
    image: "https://cdn2.cellphones.com.vn/x/media/catalog/product/o/p/oppo-find-x7_1__1.png"
  },
  {
    id: 15,
    title: "Vivo X100 Pro",
    price: 22990000,
    description: "Camera ZEISS, nhiều tính năng nhiếp ảnh.",
    image: "https://cdn2.cellphones.com.vn/x/media/catalog/product/d/i/dien-thoai-vivo-x100-pro_1_.png"
  },
  {
    id: 16,
    title: "Google Pixel 8 Pro",
    price: 23990000,
    description: "Android gốc, tính năng AI mạnh mẽ cho camera.",
    image: "https://cdn2.cellphones.com.vn/x/media/catalog/product/g/o/google-pixel-8-pro_7__2.png"
  }

];

function List() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  const { search } = useOutletContext<{ search: string }>();

  // Dùng dữ liệu giả lập (không gọi API nữa)
  useEffect(() => {
    setProducts(phoneData);
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
                    src={product.image}
                    alt={product.title}
                    className="card-img-top p-3"
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-truncate">{product.description}</p>
                    <p className="fw-bold text-danger">{product.price.toLocaleString()} ₫</p>
                  </div>
                </Link>
                <div className="mt-auto d-flex justify-content-between">
                  <button style={{ margin: "15px" }} className="btn btn-primary">
                    Mua ngay
                  </button>
                  <button style={{ margin: "15px" }} className="btn btn-outline-success">
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
