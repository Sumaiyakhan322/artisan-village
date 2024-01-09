import { useEffect, useState } from "react";
import usePublic from "../Hooks/usePublic";
import ProductsCard from "../Components/ProductsCard";

const AllProducts = () => {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countedData, setCountedData] = useState("");
  const axiosPublic = usePublic();

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosPublic.get("/products");
      const countedData = await axiosPublic.get("/productsCount");
      setAllData(data.data);
      setFilterData(data.data);
      setCountedData(countedData.data);
    };
    fetchData();
  }, [axiosPublic]);

  console.log(countedData.count);
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
    setCategory(selectedCategory);
  };

  const onOptionChange = (e) => {
    const selectedPrice = e.target.value;
    setPrice(selectedPrice);
    const [initialPrice, lastPrice] = selectedPrice.split("-").map(Number);
    const filteredProducts = allData.filter((item) => {
      const itemPrice = Number(item.price);
      return (
        itemPrice >= initialPrice &&
        itemPrice <= lastPrice &&
        item.name.toLowerCase().includes(searchTerm) &&
        item.category === category
      );
    });

    setFilterData(filteredProducts);
  };

  return (
    <div className="flex gap-10 my-10">
      <div className="space-y-9">
        <input
          type="text"
          name="name"
          onChange={handleSearch}
          placeholder="Search by product name"
        />
        <div className="space-y-6">
          <button
            className="block btn btn-outline btn-info w-20"
            onClick={() => handleCategory("All")}
          >
            All
          </button>
          <button
            className="block btn btn-outline btn-info w-20"
            onClick={() => handleCategory("Kitchen")}
          >
            Kitchen
          </button>
          <button
            className="block btn btn-outline btn-info w-20"
            onClick={() => handleCategory("Bedroom")}
          >
            Bedroom
          </button>
          <button
            className="block btn btn-outline btn-info w-20"
            onClick={() => handleCategory("Living Room")}
          >
            Living Room
          </button>
        </div>
        <div>
          <div>
            <h3>Select price Size</h3>
            <div>
              <input
                type="radio"
                name="price"
                value="300-400"
                id="regular"
                // checked={setPrice === "300-400"}
                onChange={onOptionChange}
              />
              <label htmlFor="regular">300-400</label>
            </div>
            <div>
              <input
                type="radio"
                name="price"
                value="200-300"
                id="medium"
                // checked={setPrice === "200-300"}
                onChange={onOptionChange}
              />
              <label htmlFor="medium">200-300</label>
            </div>
            <div>
              <input
                type="radio"
                name="price"
                value="100-200"
                id="large"
                // checked={setPrice === "100-200"}
                onChange={onOptionChange}
              />
              <label htmlFor="large">100-200</label>
            </div>
            <div>
              <input
                type="radio"
                name="price"
                value="10-100"
                id="extra-large"
                // checked={setPrice === "10-100"}
                onChange={onOptionChange}
              />
              <label htmlFor="extra-large">10-100</label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {filterData.map((item) => (
          <ProductsCard item={item} key={item._id}></ProductsCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
