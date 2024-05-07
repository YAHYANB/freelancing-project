import { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import { ImSpinner2 } from 'react-icons/im';
// import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGig } from "../../redux/Gigs";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const gigs = useSelector((i) => i.gigs?.gigs.gigs);
  // const status = useSelector((state) => state.gigs?.status);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = ()=> {
    console.log(minRef.current.value)
    console.log(maxRef.current.value)
  }
  window.scrollTo(0, 0);
  return (
    <div className="gigs mx-6">
      <div className="container">
        <span className="breadcrumbs">Liverr {'>'} Graphics & Design {'>'}</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverrs AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right pr-12">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs?.map((gig) => (
            <>
            {/* { status === 'loaging' ? <ImSpinner2 className='mx-auto animate-spin text-green-700 text-sm ' />
              : */}

              <GigCard key={gig.id} item={gig}/>
              
            {/* } */}
            
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
