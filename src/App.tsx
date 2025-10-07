import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import List from './pages/List'
import Detail from './pages/Detail'
import Add from './pages/Add'
import UseList from './pages/useList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "5rem", fontWeight: "bold" }}>
            Xin chào Admin
          </h1>
        </div>} />
        {/* <Route path="products" element={<List />} /> */}
        <Route path="products" element={<UseList />} />
        <Route path="products/:id" element={<Detail />} />
        <Route path="products/add" element={<Add />} />
        <Route path="about" element={<h1>About</h1>} />
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  )
}

export default App
