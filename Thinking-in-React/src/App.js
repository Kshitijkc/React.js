import { useState } from "react"

function SearchBar({ showInStock, filterText, setfilter }) {
  return (
    <>
      <div>
        <input type="text" value={filterText} onChange={(e) => setfilter(e.target.value)}/>
      </div>
      <div>
        <input type="checkbox" onClick={showInStock}></input>
        <label>Only show products in stock</label>
      </div>
    </>
  )
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product["name"]}</td>
      <td>{product["price"]}</td>
    </tr>
  )
}

function ProductList({ productList }) {
  return (
    <>
      {
        productList.map((product) => <ProductRow product={product}/>)
      }
    </>
  )
}

function ProductCategory({ productMap }) {
  const categories = Object.keys(productMap);

  return (
    <>
      {
        categories.map((category) => (
          <>
            <thead>
              <th>{category}</th>
            </thead>
            <tbody>
              <ProductList productList={productMap[category]} />
            </tbody>
          </>
        ))
      }
    </>
  )
}

function ProductTable({ products, filterText, onlyInStock }) {
  const productMap = {};

  for(let product of products) {
    if(product["name"].toLowerCase().includes(filterText) && product["stocked"]==onlyInStock) {
      if(product["category"] in productMap) {
        productMap[product["category"]].push(product);
      } else {
        productMap[product["category"]]= [product];
      }
    }
  }
  
  return (
    <>
      <table>
        <thead>
          <th>Name</th>
          <th>Price</th>
        </thead>
      </table>
      <table>
        <ProductCategory productMap={productMap} />
      </table>
    </>
  )
}

function FilterableProductTable({ products }) {
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filterText, setFilterText] = useState("");

  function showOnlyStock() {
    setOnlyInStock(!onlyInStock);
  }

  return (
    <>
      <SearchBar showInStock={showOnlyStock} filterText={filterText} setfilter={setFilterText}/>
      <ProductTable products={products} filterText={filterText} onlyInStock={onlyInStock}/>
    </>
  )
}

export default function() {
  return (
    <>
      <FilterableProductTable products={Products} />
    </>
  )
}

const Products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]