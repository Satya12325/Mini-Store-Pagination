import Cards from "./components/Cards";
import Navbar from "./components/Navbar";
import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setdata] = useState();
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [predisbla, setPreDisable] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const getData = async () => {
    setLoad(true);
    try {
      const response = await axios.get(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=6&page=${page}`
      );
      console.log(response.data.data);
      const data = response.data.data;
      setdata(data);
      setLoad(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleBack = () => {
    if (page === 1) {
      setPreDisable(true);
      return;
    }
    setPage(page - 1);
  };
  const handleNext = () => {
    // if(page === 1){
    //   setPreDisable()
    //   return;
    // }
    setPreDisable(false);

    setPage(page + 1);
  };

  const handleAddCart = (id) => {
    const update = data.filter((item) => item.id === id);
    console.log(update);
    setCartData([...cartData, update[0]]);
  };

  const handleCartOPen = () => {
    setCartOpen(true);
  };
  const handleClickHome = () => {
    setCartOpen(false);
  };
  const handleRemove = (id) => {
    const update = cartData.filter((item) => item.id !== id);
    setCartData(update);
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div className="App">
      <Navbar
        cart={cartData.length}
        handleCart={handleCartOPen}
        handleClickHome={handleClickHome}
      />
      {cartOpen ? (
        <div>
          {cartData.length === 0 ? (
            <div>Cart is Empty</div>
          ) : (
            <div className="cardContainer">
              {cartData?.map((item) => (
                <Cards
                  {...item}
                  btn="REMOVE"
                  handleClick={() => handleRemove(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="btnContainer">
            <button disabled={predisbla} onClick={handleBack}>
              Previus
            </button>
            <div>{page}</div>
            <button onClick={handleNext}>Next</button>
          </div>
          {load ? (
            <h1>...Loading</h1>
          ) : (
            <div className="cardContainer">
              {data?.map((item) => (
                <Cards
                  {...item}
                  btn="Add to cart"
                  handleClick={() => handleAddCart(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
