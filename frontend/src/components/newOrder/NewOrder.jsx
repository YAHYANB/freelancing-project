// import React, { useState, useEffect } from 'react';
// import Navbar from '../navbar/Navbar';
// import Orders from '../../pages/orders/Orders';

// const App = () => {
//     const [newOrdersCount, setNewOrdersCount] = useState(0);
//     const [orders, setOrders] = useState([]);
//     const user = useSelector(u => u.user.user)

//     useEffect(() => {
//         const eventSource = new EventSource(`http://127.0.0.1:8000/api/orders/stream/${user.id}`);

//         eventSource.onmessage = function (event) {
//             const newOrders = JSON.parse(event.data);
//             setOrders(newOrders);
//             setNewOrdersCount(newOrders.length);
//         };

//         eventSource.onerror = function () {
//             console.error("Error in SSE connection");
//             eventSource.close();
//         };

//         return () => {
//             eventSource.close();
//         };
//     }, [token]);

//     return (
//         <div>
//             <Navbar newOrdersCount={newOrdersCount} />
//             <Orders orders={orders}/>
//         </div>
//     );
// };

// export default App;
