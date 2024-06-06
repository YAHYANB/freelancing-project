import { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import { FaCaretDown } from "react-icons/fa";
import GigCard from "../../components/gigCard/GigCard";
import { useSelector } from "react-redux";
import categories from '../../categories.json';
import { useParams } from "react-router-dom";
import { ImSpinner2 } from 'react-icons/im';

function Gigs({ searchHome, setSearchHome }) {

  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const allGigs = useSelector((state) => state.gigs?.gigs?.gigs || []);

  const [filteredGigs, setFilteredGigs] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    if (searchHome) {
      setSearch(searchHome)
      handleSearch()
    }
  }, [searchHome])

  useEffect(() => {
    if (allGigs?.length > 0) {
      applyFilters();
    }
  }, [allGigs, sort, search, name]);

  const applyFilters = () => {
    const minPrice = parseFloat(minRef.current.value) || 0;
    const maxPrice = parseFloat(maxRef.current.value) || Infinity;
    const category = sort || name || "";

    const filtered = allGigs?.filter((gig) => {
      return (
        gig.price >= minPrice &&
        gig.price <= maxPrice &&
        gig.description.toUpperCase().includes(search.toUpperCase()) &&
        (category === "" || category.toUpperCase().includes(gig.category.toUpperCase()))
      );
    });

    setFilteredGigs(filtered || []);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleSort = (category) => {
    setSort(category);
    setOpen(false);
    applyFilters();
  };

  useEffect(() => {
    if (name) {
      setSort(name);
      applyFilters();
    }
  }, [name]);



  return (
    <div className="gigs px-14">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <h1>All Services</h1>
            <p>
              Explore the boundaries of art and technology with HYBN
            </p>
          </div>
          <div className="relative text-lg flex items-center bg-white border rounded-full px-4 py-2 mr-8">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none flex-1 w-72 text-sm text-gray-700 focus:w-80 focus:py-1 duration-200"
            />
            <button onClick={handleSearch} className="bg-[#1dbf73] text-white ml-1 rounded-full py-1 px-3 text-sm hover:px-4 hover:py-[5px] duration-200">
              Search
            </button>
          </div>
        </div>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={applyFilters}>Apply</button>
          </div>
          <div className="right pr-8 flex items-center">
            <span className="sortBy">Sort by categories</span>
            <div onClick={() => setOpen(!open)} className="flex items-center cursor-pointer">
              <span className="sortType">
                {sort || 'All Gigs'}
              </span>
              <FaCaretDown />
            </div>

            {open && (
              <div className="rightMenu" style={{ maxHeight: "200px", overflowY: "auto" }}>
                <span onClick={() => handleSort(null)}>All Gigs</span>
                {categories.map((item, i) => (
                  <span key={i} onClick={() => handleSort(item.name)}>{item.name}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {filteredGigs?.length > 0 ? filteredGigs?.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          )) : (
            <span className="text-center mx-auto mt-24 text-gray-400 text-lg">
              This category does not have any gig
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
