import { BsCreditCard2Back } from "react-icons/bs";
import "./Payment.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Payment() {
    const [toggleClassName, setToggleClasName] = useState(1)

    const changeMethod = (num) => {
        setToggleClasName(num)
    }
    window.scrollTo(0, 0);
    return (
        <div className="payments">
            <div className="container">
                <h2>Payments history</h2>
                <div className="table-history">
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
                            <tr>
                                <td><span>$200</span></td>
                                <td>Paypal</td>
                                <td>November 18, 2022</td>
                                <td>completed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2>Balance</h2>
                    <div className="ballance">
                        <p>Balance : <span> $0.00</span></p>
                    </div>
                </div>
                <div>
                    <h2>Belling Methods</h2>
                    <div className="divContent">
                        <div className="methods">
                        <h4>Add a billing method : </h4>
                        <div className="items">
                            <span className={toggleClassName === 1 ? 'active' : ''} onClick={() => changeMethod(1)}><img src="img/logo.png"/></span>
                            <span className={toggleClassName === 2 ? 'active' : ''} onClick={() => changeMethod(2)}><img src="img/symboles.png"/></span>
                            <span className={toggleClassName === 3 ? 'spanCard active' : 'spanCard'} onClick={() => changeMethod(3)}><BsCreditCard2Back size='16px'/><span>Credit card </span></span>
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
                            <p>We will transfer you over to PayPal's secure servers</p>
                            <Link className="Link1"><span>Pay with</span>PayPal</Link>
                        </div>
                        <div className={toggleClassName === 2 ? 'paypal' : 'hidde'}>
                            <p>We will transfer you over to payoneer's secure servers</p>
                            <Link className="Link2"><span>Pay with</span>PaYoneer</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
