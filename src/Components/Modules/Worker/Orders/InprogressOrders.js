import React from 'react'
import './InprogressOrders.css'
import WorkerNavbar from '../../../Pages/Navbar/WorkerNavbar'

const InprogressOrders = () => {
  return (
    <>
    <WorkerNavbar />
    <div className="worker-inprogress-order-container">
        <h1>InProgress Orders</h1>
      </div>
    </>
  )
}

export default InprogressOrders