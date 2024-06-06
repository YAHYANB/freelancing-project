import { BsCreditCard2Back } from "react-icons/bs";
import "./Payment.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchWithDraw } from "../../redux/Payment";
import Verification from "../../components/forms/Verification";
import Modal from "../../components/modal/Modal";

export default function Payment() {
    const [toggleClassName, setToggleClasName] = useState(1)
    const user = useSelector(res => res.user.user)
    const token = JSON.parse(localStorage.getItem('token'))
    const [modal, setModal] = useState(false);

    // const changeMethod = (num) => {
    //     setToggleClasName(num)
    // }

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="payments">
            <div className="container">
                <h2>Payments history</h2>
                <div className="table-history">
                    <h1 className="font-semibold">Bought payments :</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.bought_payments?.slice().reverse().map(py => (
                                <tr>
                                    <td><span>${py.amount}</span></td>
                                    <td>Paypal</td>
                                    <td>{formatDate(py.created_at)}</td>
                                    <td>{py.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h1 className="font-semibold mt-10">Sold payments :</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.sold_payments?.slice().reverse().map(py => (
                                <tr>
                                    <td><span>${py.amount}</span></td>
                                    <td>Paypal</td>
                                    <td>{formatDate(py.created_at)}</td>
                                    <td>{py.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Withdrawing history</h2>
                <div className="table-history">
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.payouts.map(py => (
                                <tr>
                                    <td><span>${py.amount}</span></td>
                                    <td>{formatDate(py.created_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2>Balance</h2>
                    <div className="ballance">
                        <p>Total Earnings : <span> ${user?.total_earnings}</span></p>
                    </div>
                </div>
                <div>
                    <h2>Withdraw Earnings</h2>
                    <div className="divContent">
                        <div className="methods">
                            <h4>Add a billing method : </h4>
                            <div className="items">
                                <span className={toggleClassName === 1 ? 'active' : ''}><img src="img/logo.png" /></span>
                                <span className=""><img src="img/symboles.png" className="opacity-25" /></span>
                                <span className='spanCard opacity-40'><BsCreditCard2Back size='16px' /><span>Credit card </span></span>
                            </div>
                        </div>
                        <div className={toggleClassName === 3 ? 'form' : 'hidde'}>
                            <div>
                                <div className="cardLabel">
                                    <label>Card number</label>
                                    <img src="images.png" />
                                </div>
                                <div className="inputForm">
                                    <div className="block">
                                        <BsCreditCard2Back />
                                        <input placeholder="1234 7649 4679 7497" />
                                    </div>
                                    <div className="block">
                                        <BsCreditCard2Back />
                                        <span>security</span>
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                <div className="items">
                                    <label>First Name</label>
                                    <input type="text" placeholder="Hafid" />
                                </div>
                                <div className="items">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Hafid" />
                                </div>
                                <div className="items">
                                    <label>Expiration month</label>
                                    <input type="number" placeholder="MM" maxLength="2" className="no-spinners" />
                                </div>
                                <div className="items">
                                    <label>Expiration year</label>
                                    <input type="number" placeholder="YY" maxLength="2" className="no-spinners" />
                                </div>
                                <div className="items">
                                    <label>Security code</label>
                                    <input type="number" placeholder="3 digits" maxLength="3" className="no-spinners" />
                                </div>
                                <div className="items">
                                    <label>Cardholder's name</label>
                                    <input type="text" placeholder="As it is on the card" />
                                </div>
                            </div>
                            <button>Save</button>
                        </div>
                        <div className={toggleClassName === 1 ? 'paypal' : 'hidde'}>

                            <button onClick={() => setModal(true)} className="Link1"><span>Withdraw earnings with</span>PayPal</button>
                            <Modal isOpen={modal} onClose={() => setModal(false)}>
                                {modal && <Verification setModal={setModal} />}
                            </Modal>
                        </div>
                        <div className={toggleClassName === 2 ? 'paypal' : 'hidde'}>
                            <p>We will transfer you over to payoneer's secure servers</p>
                            <Link className="Link2"><span>Pay with</span>PaYoneer</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}
