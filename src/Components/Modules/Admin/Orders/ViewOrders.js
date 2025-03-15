import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/DataTable';
import { Button, Row, Col } from 'react-bootstrap';
import './ViewOrders.css';
import axios from "axios";
import baseURL from '../../../../Url/NodeBaseURL';
import Navbar from '../../../Pages/Navbar/Navbar';


const ViewOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [assignedWorkers, setAssignedWorkers] = useState({});

  // Fetch workers
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(`${baseURL}/accounts`);
        if (!response.ok) {
          throw new Error('Failed to fetch workers');
        }
        const result = await response.json();

        const workers = result
          .filter((item) => item.account_group === 'WORKER')
          .map((item) => ({
            id: item.id,
            account_name: item.account_name,
          }));

        setWorkers(workers);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  // Fetch orders
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Function to update assigned worker in backend
  const updateOrderWithWorker = async (orderId, workerId, workerName) => {
    try {
      const response = await fetch(`${baseURL}/api/orders/assign/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigned_status: workerId ? 'Assigned' : 'Not Assigned',
          worker_id: workerId,  // Store worker ID in the database
          worker_name: workerName,  // Store worker Name in the database
          work_status:'Pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      // Update UI state after successful update
      // setData((prevData) =>
      //   prevData.map((order) =>
      //     order.order_number === orderId
      //       ? { ...order, assigned_status: 'Assigned', worker_id: workerId, worker_name: workerName }
      //       : order
      //   )
      // );

      setAssignedWorkers((prev) => ({ ...prev, [orderId]: workerName })); // Store worker name for display
      fetchData();

    } catch (error) {
      console.error('Error updating order:', error);
    }
  };


  const columns = React.useMemo(
    () => [
      { Header: 'Sr. No.', Cell: ({ row }) => row.index + 1 },
      {
        Header: 'Date',
        accessor: (row) => {
          const date = new Date(row.date);
          return date.toLocaleDateString('en-GB');
        },
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
      },
      {
        Header: 'Customer',
        accessor: 'account_name',
      },
      {
        Header: 'Order Number',
        accessor: 'order_number',
      },
      {
        Header: 'Metal',
        accessor: 'metal',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Sub Category',
        accessor: 'subcategory',
      },
      {
        Header: 'Total Amt',
        accessor: 'total_price',
      },
      {
        Header: "Order Status",
        accessor: "order_status",
        Cell: ({ row }) => {
          const [status, setStatus] = useState(row.original.order_status || "Placed");
          const isPending = row.original.work_status === "Pending"; // Check if work_status is Pending
          const isDisabled = row.original.order_status === 'Canceled';
      
          const handleStatusChange = async (event) => {
            const newStatus = event.target.value;
            setStatus(newStatus);
      
            try {
              const response = await axios.put(`${baseURL}/api/orders/status/${row.original.id}`, {
                order_status: newStatus, // Update order_status
                worker_id: row.original.worker_id, // Keep worker_id same
                worker_name: row.original.worker_name, // Keep worker_name same
              });
      
              console.log("Status updated:", response.data);
              alert("Order status updated successfully!");
            } catch (error) {
              console.error("Error updating status:", error);
              alert("Failed to update status.");
            }
          };
      
          return (
            <select value={status} onChange={handleStatusChange} disabled={isDisabled}>
              <option value="Placed">Placed</option>
              <option value="Processing" disabled={isPending}>Processing</option>
              <option value="Ready for Delivery" disabled={isPending}>Ready for Delivery</option>
              <option value="Dispatched" disabled={isPending}>Dispatched</option>
              <option value="Shipped" disabled={isPending}>Shipped</option>
              <option value="Out for Delivery" disabled={isPending}>Out for Delivery</option>
              <option value="Delivered" disabled={isPending}>Delivered</option>
              <option value="Canceled" disabled={isPending}>Cancel</option>
            </select>
          );
        },
      },
      // {
      //   Header: 'Image',
      //   accessor: 'image_url', // Keep accessor as is
      //   Cell: ({ value }) => (
      //     value ? (
      //       <img
      //         src={`${baseURL}${value}`} // Construct full image URL
      //         alt="Order Image"
      //         style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }}
      //       />
      //     ) : (
      //       'No Image' // Display text if image is missing
      //     )
      //   ),
      // },
      {
        Header: 'Image',
        accessor: 'image_url',
        Cell: ({ value }) => {
          const handleImageClick = () => {
            if (value) {
              const newWindow = window.open();
              if (newWindow) {
                newWindow.document.write(`
                  <html>
                    <head>
                      <title>Order Image</title>
                    </head>
                    <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
                      <img src="${baseURL}${value}" alt="Order Image" style="width: auto; height: auto; max-width: 90vw; max-height: 90vh;" />
                    </body>
                  </html>
                `);
                newWindow.document.close(); // Close document stream to fully load content
              }
            }
          };
      
          return value ? (
            <img
              src={`${baseURL}${value}`}
              alt="Order Image"
              style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={handleImageClick}
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
          ) : (
            'No Image'
          );
        }
      },
      {
        Header: 'Assign Worker',
        Cell: ({ row }) => {
          const assignedWorkerName = row.original.worker_name; // Get assigned worker name from row data
          const isDisabled = row.original.assigned_status === 'Accepted'; // Check if status is 'Accepted'
      
          return (
            <select
              value={assignedWorkerName || ''} // Set selected value if worker_name matches
              onChange={(e) => {
                const selectedWorker = workers.find(worker => worker.account_name === e.target.value);
                updateOrderWithWorker(row.original.id, selectedWorker?.id, selectedWorker?.account_name);
              }}
              disabled={isDisabled} // Disable select if status is 'Accepted'
            >
              <option value="">Select Worker</option>
              {workers.map((worker) => (
                <option key={worker.id} value={worker.account_name}>
                  {worker.account_name}
                </option>
              ))}
            </select>
         );
       },
      },
      {
        Header: 'Assigned Status',
        accessor: 'assigned_status',
        Cell: ({ row }) => row.original.assigned_status || 'Not Assigned',
      },
      {
        Header: 'Worker Name',
        accessor: 'worker_name',
        Cell: ({ row }) => row.original.worker_name || 'N/A',
      },

      {
        Header: 'Work Status',
        accessor: 'work_status',
        Cell: ({ row }) => row.original.work_status || 'N/A',
      },

    ],
    [workers, assignedWorkers]
  );

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="customers-table-container">
          <Row className="mb-3">
            <Col className="d-flex justify-content-between align-items-center">
              <h3>Orders</h3>
              <Button
                className="create_but"
                onClick={() => navigate('/a-orders')}
                style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
              >
                + Create
              </Button>
            </Col>
          </Row>
          {loading ? <div>Loading...</div> : <DataTable columns={columns} data={[...data].reverse()} />}
        </div>
      </div>
    </>
  );
};

export default ViewOrders;
