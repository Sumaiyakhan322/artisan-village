import { useEffect, useState } from "react";
import usePublic from "../Hooks/usePublic";
import ProductsCard from "../Components/ProductsCard";
import SearchOptions from "../Components/SearchOptions";

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
        <div >
            <SearchOptions handleCategory={handleCategory} handleSearch={handleSearch} onOptionChange={onOptionChange}></SearchOptions>
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
