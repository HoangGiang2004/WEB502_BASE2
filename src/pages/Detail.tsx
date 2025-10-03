import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

function Detail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log("Lỗi API: ", err));
    }, [id]);
    if (!product) {
        return <p className="text-center mt-4">Đang tải sản phẩm</p>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-5">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid border rounded p-3"
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                </div>
                <div className="col-md-7">
                    <h2 className="fw-bold">{product.title}</h2>
                    <p className="text-muted">Mã SP: {product.id}</p>
                    <h4 className="text-danger mb-3">${product.price}</h4>
                    <p>{product.description}</p>
                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-primary">Mua ngay</button>
                        <button className="btn btn-outline-success">Thêm vào giỏ</button>
                    </div>
                    <Link to="/products" className="btn btn-link mt-3">
                        ← Quay lại danh sách
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Detail;