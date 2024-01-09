

const ProductsCard = ({item}) => {
    return (
        <div>
             <div key={item._id}>
            <div className="card bg-yellow-200 shadow-xl p-10">
              <div className="card-body">
                <h2 className="card-title text-3xl">{item.name}</h2>
                <p>{item.price}</p>
                <p>{item.description}</p>
                <p className="text-3xl">{item.category}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ProductsCard;