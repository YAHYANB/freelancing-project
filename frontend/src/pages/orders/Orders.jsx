import "./Orders.scss";

const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };
  window.scrollTo(0, 0);
  return (
    <div className="orders py-10 px-28">
      <div className="container">
        <div className="title flex justify-between items-center mb-8">
          <h1 className="text-3xl uppercase">Orders</h1>
        </div>
        <table className="my-8">
          <tr>
            <th className="px-3">Image</th>
            <th className="px-3">Title</th>
            <th className="px-3">Price</th>
            <th className="px-3">Buyer</th>
            <th className="px-3">Contact</th>
          </tr>
          <tr>
            <td className="px-3">
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td className="px-3">Stunning concept art</td>
            <td className="px-3">59.<sup>99</sup></td>
            <td className="px-3">Maria Anders</td>
            <td className="px-3">
              <img className="message" src="./img/message.png" alt="" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Orders;
