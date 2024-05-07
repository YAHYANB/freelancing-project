import { Link, Navigate } from "react-router-dom";
import "./MyGigs.scss";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestroyGig } from "../../redux/Gigs";
import { ImSpinner2 } from 'react-icons/im';
import { useEffect, useState } from "react";

function MyGigs() {
  const user = useSelector((i) => i.user?.user)
  const token = JSON.parse(localStorage.getItem('token'))
  const status = useSelector((state) => state.gigs?.status);
  const [gigId, setGigId] = useState(null)
  const dispatch = useDispatch()
  const handleDeleteGig = async (gigId) => {
    setGigId(gigId)
    const data = {
      token, id: gigId
    }
    const response = await dispatch(fetchDestroyGig(data))
    if (response?.payload.status === 200) {
      window.location.href = '/mygigs'
    }
  }

  window.scrollTo(0, 0);
  return (
    <div className="myGigs py-10 px-28">
      <div className="container">
        <div className="title flex justify-between items-center mb-8">
          <h1 className="text-3xl uppercase">My Gigs</h1>
          <Link to="/add">
            <button className="rounded-sm">Add New Gig</button>
          </Link>
        </div>
        <table className="mb-6">
          <tr>
            <th className="px-3">Image</th>
            <th className="px-3">Title</th>
            <th className="px-3">Price</th>
            <th className="px-3">Sales</th>
            <th className="px-3">Action</th>
          </tr>
          {user.gigs.length === 0 &&
            <tr colSpan={5}>
              <td colSpan={5} className="px-[40%] py-8 text-gray-400">
                Nothing Found
              </td>            </tr>
          }
          {user?.gigs?.map((gig) => (
            <tr className="hover:opacity-85 cursor-pointer">
              <td className="px-3">
                <Link to={`/gig/${gig.id}`} className="block w-full h-full">
                  <img
                    className="image"
                    src={'http://127.0.0.1:8000/images/gigs/coverImages/' + gig.coverImage}
                    alt=""
                  />
                </Link>
              </td>
              <td className="truncate-overflow overflow-ellipsis line-clamp-1 px-3"><Link to={`/gig/${gig.id}`} className="block w-full h-full">{gig.shortDescription}</Link></td>
              <td className="px-3"><Link to={`/gig/${gig.id}`} className="block w-full h-full">{gig.price}</Link></td>
              <td className="px-3"><Link to={`/gig/${gig.id}`} className="block w-full h-full">0</Link></td>

              <td className="flex items-center space-x-5 justify-start my-3 px-5">
                <Link to={`/myGigs/edit/${gig.id}`}>
                  <FaRegEdit className="text-sky-600 text-lg hover:text-sky-500 hover:cursor-pointer" />
                </Link>
                {status === 'loading' && gig.id === gigId ?
                  <ImSpinner2 className='mx-auto animate-spin text-red-700 text-sm ' />
                  :
                  <RiDeleteBin6Fill className="text-red-600 text-xl hover:text-red-500 hover:cursor-pointer" onClick={() => handleDeleteGig(gig.id)} />
                }
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default MyGigs;
