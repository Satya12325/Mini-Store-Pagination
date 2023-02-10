export default function Navbar({ handleClickHome, cart, handleCart }) {
  return (
    <>
      <div className="navbar">
        <div onClick={handleClickHome}>Home</div>
        <div className="cartBtn" onClick={handleCart}>
          <div>Cart</div>
          <div>{cart}</div>
        </div>
      </div>
    </>
  );
}
