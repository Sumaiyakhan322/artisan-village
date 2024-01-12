import { useEffect, useState } from "react";
import usePublic from "../Hooks/usePublic";
import ProductsCard from "../Components/ProductsCard";
import SearchOptions from "../Components/SearchOptions";

const AllProducts = () => {
  const axiosPublic = usePublic();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countedData, setCountedData] = useState("");
  const [itemsPerPage,setItemsPerPage]=useState(5)

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

  //pagination

  const totalCountedData = parseInt(countedData.count);
 
  const numberOfPage = Math.ceil(totalCountedData / itemsPerPage);
  const pages = [];
  for (let i = 1; i < numberOfPage+1; i++) {
    pages.push(i);
  }
const handlePerPage=(e)=>{
 console.log(e.target.value);
 setItemsPerPage(e.target.value)
}
  return (
    <div className="flex gap-10 my-10">
      <div className="space-y-9">
        <div>
          <SearchOptions
            handleCategory={handleCategory}
            handleSearch={handleSearch}
            onOptionChange={onOptionChange}
          ></SearchOptions>
        </div>
      </div>
      <div>
      <div className="grid grid-cols-3 gap-5">
        {filterData.map((item) => (
          <ProductsCard item={item} key={item._id}></ProductsCard>
        ))}
        {/* pagination */}
      
        </div>
        <div className="">
          {pages.map((page, index) => (
            <button key={index} className="btn">
              {page}
            </button>
          ))}
          <select name="" id="" value={itemsPerPage} onChange={handlePerPage}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>

     
    
    </div>
  );
};

export default AllProducts;
