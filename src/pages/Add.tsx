import React, { useState } from "react";
import axios from "axios";

function Add() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !image) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      const newProduct = { title, price, description, image };
      const res = await axios.post("https://fakestoreapi.com/products", newProduct);
      console.log("Thêm sản phẩm thành công: ", res.data);
      alert("Sản phẩm đã được thêm!");
      //Reset form
      setTitle("");
      setPrice(0);
      setDescription("");
      setImage("");
    } catch (error) {
      console.log("Lỗi khi thêm sản phẩm: ", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold">Thêm sản phẩm mới</h2>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Nhập giá sản phẩm"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả sản phẩm"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Ảnh (URL)</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Nhập link ảnh sản phẩm"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Thêm mới
        </button>
      </form>
    </div>
  );
}

export default Add;