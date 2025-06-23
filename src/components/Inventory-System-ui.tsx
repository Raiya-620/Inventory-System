import { useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/button";

const productCategories = ["Electronics", "Clothing", "Groceries", "Books"];

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  date: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Blendor",
    category: "Electronics",
    price: 500,
    stock: 10,
    date: "2025-01-06",
  },
];

const initialSales: Product[] = [];

export default function InventoryApp() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sales, setSales] = useState<Product[]>(initialSales);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const [view, setView] = useState<"add" | "buy" | "inventory" | "sales">(
    "inventory"
  );

  const addProduct = () => {
    if (!form.name || !form.category || !form.price || !form.stock) return;
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setForm({ name: "", category: "", price: "", stock: "" });
  };

  const handleBuy = (product: Product) => {
    if (product.stock > 0) {
      const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      );
      setProducts(updatedProducts);
      setSales([
        ...sales,
        { ...product, date: new Date().toISOString().split("T")[0] },
      ]);
    }
  };

  return (
    <div className="flex min-h-screen w-screen">
      <aside className="w-64 bg-gray-100 p-4 flex flex-col justify-between h-screen">
        <div>
          <h2 className="text-lg font-semibold mb-4">Inventory Management</h2>
          <nav className="flex flex-col space-y-4 w-full">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setView("add")}
            >
              Add
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setView("buy")}
            >
              Buy
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setView("inventory")}
            >
              Inventory Report
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setView("sales")}
            >
              Sales Report
            </Button>
          </nav>
        </div>
        <Button variant="destructive" className="mt-10 w-full">
          Log out
        </Button>
      </aside>

      <main className="flex-1 p-8 min-h-screen bg-white">
        {view === "add" && (
          <>
            <h1 className="text-xl font-bold mb-4">Add Product</h1>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 mr-2"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 mr-2"
              >
                <option value="">Select Category</option>
                {productCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="border p-2 mr-2"
              />
              <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="border p-2 mr-2"
              />
              <Button onClick={addProduct}>Add Product</Button>
            </div>
          </>
        )}

        {view === "buy" && (
          <>
            <h1 className="text-xl font-bold mb-4">Buy Product</h1>
            <Card>
              <CardContent className="overflow-x-auto">
                <table className="table-auto w-full border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Stock</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="px-4 py-2">{p.name}</td>
                        <td className="px-4 py-2">{p.category}</td>
                        <td className="px-4 py-2">{p.price}</td>
                        <td className="px-4 py-2">{p.stock}</td>
                        <td className="px-4 py-2">
                          <Button
                            onClick={() => handleBuy(p)}
                            disabled={p.stock === 0}
                          >
                            {p.stock === 0 ? "Out of Stock" : "Buy"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}

        {view === "inventory" && (
          <>
            <div className="flex justify-between mb-6">
              <h1 className="text-xl font-bold">Inventory Report</h1>
              <Button variant="outline">Export file</Button>
            </div>
            <Card>
              <CardContent className="overflow-x-auto">
                <table className="table-auto w-full border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Stock</th>
                      <th className="px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="px-4 py-2">{p.name}</td>
                        <td className="px-4 py-2">{p.price}</td>
                        <td className="px-4 py-2">{p.category}</td>
                        <td className="px-4 py-2">{p.stock}</td>
                        <td className="px-4 py-2">{p.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}

        {view === "sales" && (
          <>
            <h1 className="text-xl font-bold mb-4">Sales Report</h1>
            <Card>
              <CardContent className="overflow-x-auto">
                <table className="table-auto w-full border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((s, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{s.name}</td>
                        <td className="px-4 py-2">{s.category}</td>
                        <td className="px-4 py-2">{s.price}</td>
                        <td className="px-4 py-2">{s.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
