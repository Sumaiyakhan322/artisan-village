

const SearchOptions = ({handleCategory,handleSearch,onOptionChange}) => {
    return (
        <div>
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
    );
};

export default SearchOptions;