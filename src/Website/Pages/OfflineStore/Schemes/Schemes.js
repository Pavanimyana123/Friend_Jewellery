import React from 'react';
import './Schemes.css';
import Navbar from '../../../Navbar/Navbar';
import Footer from '../../../Footer/Footer';

function Schemes() {
  return (
    <>
    <Navbar />
    <div>
      <img className='img2' src="https://princejewellery.com/staging/prince/public/storage/slider_images/Default/MkOsXtMfGwdL5bPYXKAX0XZZHdgKy6V8mAb1yVUy.jpg" alt="Banner" />
    <div className="schemes-container">
      <h2 className="schemes-title">Jewellery Purchase Plan - Divine</h2>
      <p className="schemes-subtitle">Minimum Rs.1000/- and Above</p>
      <p className="schemes-note">Table shown for illustrative purpose only...</p>

      <table className="schemes-table">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Month</th>
            <th>Installment</th>
            <th>If Discontinued</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>January</td><td>10,000</td><td></td></tr>
          <tr><td>2</td><td>February</td><td>10,000</td><td></td></tr>
          <tr><td>3</td><td>March</td><td>10,000</td><td>No discount on making and wastage if discontinued before 5 months...</td></tr>
          <tr><td>4</td><td>April</td><td>10,000</td><td></td></tr>
          <tr><td>5</td><td>May</td><td>10,000</td><td></td></tr>
          <tr><td>6</td><td>June</td><td>10,000</td><td></td></tr>
          <tr><td>7</td><td>July</td><td>10,000</td><td>Only 25% discount on making and wastage if discontinued 6th month to 10th month...</td></tr>
          <tr><td>8</td><td>August</td><td>10,000</td><td></td></tr>
          <tr><td>9</td><td>September</td><td>10,000</td><td></td></tr>
          <tr><td>10</td><td>October</td><td>10,000</td><td></td></tr>
          <tr><td>11</td><td>November</td><td>10,000</td><td>Only 50% discount on making and wastage if discontinued 11th month and 12th month...</td></tr>
          <tr><td>12</td><td>December</td><td>10,000</td><td></td></tr>
          <tr><td colSpan="3">Amount Received</td><td>1,20,000</td></tr>
        </tbody>
      </table>

      <h3 className="terms-title">Terms & Conditions</h3>
      <ul className="terms">
        <li>This is a jewellery purchase plan. No refund of money is allowed under any circumstances under the same.</li>
        <li>This Jewellery Purchase Plan is for a period of 12 months and is transferable only to the nominee.</li>
        <li>The monthly subscription amount agreed by the members must be paid continuously for 12 months without fail to avail benefit as per the Jewellery Purchase Plan. Every month, one installment has to be paid without fail on the same date or within a grace period of 5 days from the given date. The money paid as advance for purchase of jewellery under this shall not bear any interest.</li>
        <li>At the time of joining the Jewellery Purchase Plan, the member should appoint a nominee by furnishing KYC of both self and nominee.</li>
        <li>After completion of 12 months, member can purchase gold or silver jewellery for the total amount paid. Also, members can buy gold or silver coins.</li>
        <li>Stone charges or pearl charges if any will be paid by the members.</li>
        <li>Member has to bring the membership card every month while making payments. The original membership card has to be surrendered at the time of taking delivery of jewellery. The person, who has signed the application form, should sign on the invoice and Jewellery Purchase Plan card at the time of purchase / taking delivery of jewellery.</li>
        <li>In case of change in address, loss of membership card, the Company should be kept informed without any loss of time. The member has to apply in writing for issue of duplicate card enclosing KYC requirements.</li>
        <li>The applicable GST has to be fully borne by the member at the time of purchasing. In case of increase in taxes or introduction of new levies/taxes, the same shall also be fully borne by the member at the time of purchasing.</li>
        <li>The company reserves the right to alter, amend, add or delete part or whole of the privileges of the Jewellery Purchase Plan without prior notice or suspend the same at any time if not paid on time and for complete 12 months. In such an event, money will not be refunded and the member shall purchase any item at the showroom equal to the accumulated amount.</li>
        <li>Payments can be made through cash, UPI, RTGS.</li>
        <li>All disputes are subject to Bangalore jurisdiction only.</li>
      </ul>
    </div>
    </div>
    <Footer />
    </>
  );
}

export default Schemes;
