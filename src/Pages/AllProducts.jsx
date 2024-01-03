import { useEffect } from "react";
import { useState } from "react";


const AllProducts = () => {
    const [allData, setAllData] = useState([]);
    const [filterData,setFilterData]=useState([allData])

    useEffect(() => {
      fetch('all.json')
        .then((res) => res.json())
        .then((data) => {
          setAllData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []); 
    const allCategory=['Kitchen','Bedroom','Living Room','All']
    const handleSubmit=e=>{
        e.preventDefault();
        const name=e.target.name.value;
        console.log(name);
    }
    const handleSearch=e=>{
        console.log(e.target.value);

    }
    return (
        <div className="flex">
            <div>
            <form action="" onSubmit={handleSubmit}>
            <input
          type="text"
          name="name"
          onChange={handleSearch}
          placeholder="Search by product name"
        />
        <input type="submit" />
            </form>
            {allCategory.map((category,index)=>(
                <div key={index}>
                    <button>{category}</button>
                </div>
            ))}
            </div>
            <div>

            </div>

        </div>
    );
};

export default AllProducts;