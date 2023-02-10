export default function Cards(props) {
  const { category, image, title, brand, price, btn, handleClick, id } = props;
  return (
    <>
      <div className="cards">
        <div>
          <img src={image} alt="" />
        </div>
        <div className="card-container">
          <div>{category}</div>
          <div>
            <h3>{title}</h3>
          </div>
          <div>
            <span>Brand :- {brand}</span>
          </div>
          <div>{price}</div>
          <button onClick={handleClick}>{btn}</button>
        </div>
      </div>
    </>
  );
}
