import { useEffect, useState } from "react";


const AllProducts = () =>{
    const [allData, setAllData] = useState([]);
    const [filterData,setFilterData]=useState([]);
    const [search,setSearch]=useState('')
    

    useEffect(() => {
      fetch('all.json')
        .then((res) => res.json())
        .then((data) => {
          setAllData(data);
          setFilterData(data);
          console.log(data);
        })
        
    }, []); 
    const allCategory=['Kitchen','Bedroom','Living Room','All']
    const handleSubmit=e=>{
        e.preventDefault();
        const name=e.target.name.value;
        console.log(name);
    }
    const handleSearch=e=>{
        console.log(e.target.value);
        setSearch(e.target.value);
      const our=  allData.filter(items=>{
        if( items.name.includes(e.target.value)){
          return items;
        }
        
        
        })
       setFilterData(our)
        
        
}

    return (
        <div className="flex gap-10">
            <div>
            <form action="" onSubmit={handleSubmit}>
            <input
          type="text"
          name="name"
          onChange={handleSearch}
          placeholder="Search by product name"
        />
        <input type="submit" className="btn btn-" />
            </form>
            {allCategory.map((category,index)=>(
                <div key={index}>
                    <button>{category}</button>
                </div>
            ))}
            </div>
            <div  className="grid grid-cols-3 gap-5">
                {
                    filterData.map(items=>(
                        <div key={items.id}>
                            <div className="card  bg-yellow-200 shadow-xl p-10">
  <div className="card-body">
    <h2 className="card-title text-3xl">{items.name}</h2>
    <p>{items.price}</p>
    <p>{items.description}</p>
    <p className="text-3xl">{items.category}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};      

export default AllProducts;