import { useEffect, useState } from "react";

const AllProducts = () => {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [price,setPrice]=useState('null');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("all.json");
        const data = await response.json();
        setAllData(data);
        setFilterData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchItem = e.target.value.toLowerCase();
    setSearchTerm(searchItem);

    const searchedAll = allData.filter((item) =>
      item.name.toLowerCase().includes(searchItem)
    );
    setFilterData(searchedAll);
  };

  const handleCategory = (selectedCategory) => {
    const categoryWiseItems = allData.filter(
      (item) =>
        (selectedCategory === "All" || item.category === selectedCategory) &&
        item.name.toLowerCase().includes(searchTerm)
    );
    setFilterData(categoryWiseItems);
  };
 const handlePrice=e=>{
 
 console.log(price);

 }
 const handleChange=e=>{
  setPrice(e.target.value)
 }

  return (
    <div className="flex gap-10 ">
      <div className="space-y-9">
        <input
          type="text"
          name="name"
          onChange={handleSearch}
          placeholder="Search by product name"
        />
        <div className="">
          <button className="block" onClick={() => handleCategory("All")}>
            All
          </button>
          <button className="block" onClick={() => handleCategory("Kitchen")}>
            Kitchen
          </button>
          <button className="block" onClick={() => handleCategory("Bedroom")}>
            Bedroom
          </button>
          <button
            className="block"
            onClick={() => handleCategory("Living Room")}
          >
            Living Room
          </button>
        </div>
        <div>
              

              <div>
                <form action="" onClick={handlePrice}>
           
 
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Red pill</span>
              <input
                type="radio"
                name="radio1"
                className="radio checked:bg-red-500"
                value={'Red pill'}
                checked={setPrice==='Red pill'}
                onChange={handleChange}
               
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Blue pill</span>
              <input
                type="radio"
                name="radio1"
                className="radio checked:bg-blue-500"
                value={'Blue pill'}
                checked={setPrice==='Blue pill'}
                onChange={handleChange}
              />
            </label>
          </div>
          </form>
        </div>
        

      </div>
    
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        {filterData.map((item) => (
          <div key={item.id}>
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
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
