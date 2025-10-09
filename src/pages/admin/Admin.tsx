import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
}

const Admin: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://api.escuelajs.co/api/v1/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.price || !form.description || !form.image) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
            if (editingProduct) {
                await axios.put(`https://api.escuelajs.co/api/v1/products/${editingProduct.id}`, {
                    title: form.title,
                    price: Number(form.price),
                    description: form.description,
                    images: [form.image],
                });
                alert("Cập nhật sản phẩm thành công!");
            } else {
                await axios.post("https://api.escuelajs.co/api/v1/products", {
                    title: form.title,
                    price: Number(form.price),
                    description: form.description,
                    images: [form.image],
                });
                alert("Thêm sản phẩm thành công!");
            }
            setForm({ title: "", price: "", description: "", image: "" });
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Lỗi khi lưu sản phẩm:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            try {
                await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
                setProducts(products.filter((p) => p.id !== id));
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error);
            }
        }
    };

    const handleEdit = (product: IProduct) => {
        setEditingProduct(product);
        setForm({
            title: product.title,
            price: String(product.price),
            description: product.description,
            image: product.images?.[0] || "",
        });
    };

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = products.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="admin-container">
            <h1 className="admin-title">Trang Quản Trị Sản Phẩm</h1>

            {/* Form */}
            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>{editingProduct ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}</h2>
                <div className="form-grid">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Tên sản phẩm"
                    />
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Giá"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Mô tả"
                    />
                    <input
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="Link ảnh sản phẩm"
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn-primary">
                        {editingProduct ? "Cập nhật" : "Thêm mới"}
                    </button>
                    {editingProduct && (
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => {
                                setEditingProduct(null);
                                setForm({ title: "", price: "", description: "", image: "" });
                            }}
                        >
                            Hủy
                        </button>
                    )}
                </div>
            </form>

            {/* Table */}
            <div className="table-container">
                {loading ? (
                    <p className="loading-text">Đang tải dữ liệu...</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>
                                        <img src={p.images?.[0]} alt={p.title} className="thumb" />
                                    </td>
                                    <td>{p.title}</td>
                                    <td className="price">${p.price}</td>
                                    <td className="desc">{p.description}</td>
                                    <td className="actions">
                                        <button className="btn-edit" onClick={() => handleEdit(p)}>
                                            Sửa
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Admin;





