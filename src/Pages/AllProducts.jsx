// 

import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulating fetching data from 'all.json'
    const fetchData = async () => {
      try {
        const response = await fetch('all.json');
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
    const categoryWiseItems = allData.filter((item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilterData(categoryWiseItems);
  };


  return (
    <div className="flex gap-10">
      <div>
        <input
          type="text"
          name="name"
          onChange={handleSearch}
          placeholder="Search by product name"
        />
        <div>
          <button onClick={() => handleCategory("All")}>All</button>
          <button onClick={() => handleCategory("Kitchen")}>Kitchen</button>
          <button onClick={() => handleCategory("Bedroom")}>Bedroom</button>
          <button onClick={() => handleCategory("Living Room")}>Living Room</button>
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
