import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const [search, setSearch] = useState(""); // State để lưu giá trị tìm kiếm

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search: ", search);
  };

  return (
    <div style={{ minHeight: "100vh", width: "100vw", background: "#f4f5fa" }}>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark w-100">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Trang chủ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Danh sách
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products/add">
                  Thêm mới
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input type="search" className="form-control me-1" placeholder="Tìm kiếm sản phẩm" value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: "50px" }} />
              <button className="btn btn-outline-success" type="submit" style={{ height: "50px", width: "150px", marginRight: "43px" }}>Tìm kiếm</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Outlet context={{ search }} />
      </div>
    </div>
  );
}

export default Layout;
