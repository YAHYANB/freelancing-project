import { useEffect, useState } from "react";
import "./Orders.scss";
import { useDispatch, useSelector } from "react-redux";
import Order, { acceptOrder, fetchOrders, markOrdersAsSeen, pollOrder, refundOrder } from "../../redux/Order";
import { fetchUser } from "../../redux/User";
import VerificationAction from "../../components/verifyAction/VerifyAction";
import PayModal from "../../components/paymentmodal/PayModal";
import { fetchAddChat } from "../message/chatRequests";

function Orders() {
  const dispatch = useDispatch();
  const user = useSelector(u => u.user.user)
  const ords = useSelector(u => u.order.newOrder)
  const token = JSON.parse(localStorage.getItem('token'))
  const [mssg, setMssg] = useState('');
  const [modal, setModal] = useState(false);
  const [orderId, setOrderId] = useState()

  useEffect(() => {
    if (user) {
      const fetchOrders = () => {
        dispatch(pollOrder(user.id));
      };

      fetchOrders();
      const intervalId = setInterval(fetchOrders, 5000);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (ords?.length > 0) {
      dispatch(fetchUser(token))
      dispatch(markOrdersAsSeen(user.id));
    }
  }, [dispatch, ords, user.id]);

  const addChat = async (id) => {
    try {
      const data = {
        sender_id: user.id, receiver_id: id
      }
      const response = await fetchAddChat(data)
      if (response.data.status === 200) {
        window.location.href = '/messages'
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="orders py-10 px-20">
      <div className="container">
        <div className="title flex justify-between items-center mb-8">
          <h1 className="text-3xl uppercase">Orders</h1>
        </div>
        <div>
          <h1 className="font-semibold">Selling orders :</h1>
          <table className="my-8">
            <tr>
              <th className="px-3">Image</th>
              <th className="px-3">Title</th>
              <th className="px-3">Price</th>
              <th className="px-3">Buyer</th>
              <th className="px-3">Contact</th>
            </tr>
            {user.sold_orders?.slice().reverse().map(order => (
              <tr key={order.id}>
                <td className="px-3">
                  <img
                    className="image"
                    src={'http://127.0.0.1:8000/images/gigs/coverImages/' + order.image}
                    alt=""
                  />
                </td>
                <td className="px-3">{order.description}</td>
                <td className="px-3">{order.total_amount}</td>
                <td className="px-3">{order.buyer.fname} {order.buyer.lname}</td>
                <td className="px-3">
                  <button onClick={() => addChat(order.buyer_id)}>
                    <img className="message" src="./img/message.png" alt="" />
                  </button>                </td>
              </tr>
            ))}
          </table>
        </div>
        <div>
          <h1 className="font-semibold">Buying orders :</h1>

          <table className="my-8">
            <tr>
              <th className="px-3">Image</th>
              <th className="px-3">Title</th>
              <th className="px-3">Price</th>
              <th className="px-3">Seller</th>
              <th className="px-3">Contact</th>
              <th className="px-3">Status</th>
              <th className="px-3">Action</th>
            </tr>
            {user.bought_orders?.slice().reverse().map(order => (
              <tr key={order.id}>
                <td className="px-3">
                  <img
                    className="image"
                    src={'http://127.0.0.1:8000/images/gigs/coverImages/' + order.image}
                    alt=""
                  />
                </td>
                <td className="px-3">{order.description}</td>
                <td className="px-3">{order.total_amount}</td>
                <td className="px-3">{order.seller.fname} {order.seller.lname}</td>
                <td className="px-3">
                  <button onClick={() => addChat(order.seller_id)}>
                    <img className="message" src="./img/message.png" alt="" />
                  </button>
                </td>
                <td className="px-3">{order.status}</td>
                <td className="px-3">
                  {order.status === 'pendig' ? (
                    <div className="flex">
                      <button onClick={() => { setModal('close'); setMssg('closing') }} type="button" class="text-red-600 hover:text-white border border-red-600 hover:bg-red-600   font-medium rounded-lg text-sm px-5 py-2 text-center me-2">Cancel</button>
                      <PayModal isOpen={modal === 'close'} onClose={() => setModal(false)}>
                        {modal === 'close' && <VerificationAction submit={refundOrder} orderId={order.id} mssg={mssg} setModal={setModal} />}
                      </PayModal>
                      <button onClick={() => { setModal('accept'); setMssg('accepting'); setOrderId(order.id); }} type="button" class="text-green-600 hover:text-white border border-green-700 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 ">Accept</button>
                      <PayModal isOpen={modal === 'accept'} onClose={() => setModal(false)}>
                        {modal === 'accept' && <VerificationAction submit={acceptOrder} orderId={orderId} mssg={mssg} setModal={setModal} />}
                      </PayModal>
                    </div>
                  ) : (
                    <div className="flex">
                      <button class="text-red-600 cursor-not-allowed opacity-50 border border-red-600 font-medium rounded-lg text-sm px-5 py-2 text-center me-2">Cancel</button>
                      <button class="text-green-600 cursor-not-allowed opacity-50 border border-green-700 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 ">Accept</button>
                    </div>
                  )
                  }
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
