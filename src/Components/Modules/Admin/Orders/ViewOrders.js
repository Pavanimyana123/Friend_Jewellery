import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/DataTable';
import { Button, Row, Col } from 'react-bootstrap';
import './ViewOrders.css';
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import baseURL from '../../../../Url/NodeBaseURL';
import Navbar from '../../../Pages/Navbar/Navbar';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ViewOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [assignedWorkers, setAssignedWorkers] = useState({});
  const [orders, setOrders] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data

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
          work_status: 'Pending',
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

  // Function to delete order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      await axios.delete(`${baseURL}/api/delete-order/${id}`);
      alert("Order deleted successfully");
      setOrders(orders.filter(order => order.id !== id)); // Update state after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  const handleEdit = (id) => {
    navigate(`/a-edit-order/${id}`);
  };


  const exportToExcel = () => {
    // Use filteredData if available, otherwise export all data
    const exportData = filteredData.length > 0 ? filteredData : data;
  
    if (exportData.length === 0) {
      alert("No data available for export.");
      return;
    }
  
    // Map data into a structured format for Excel
    const worksheet = XLSX.utils.json_to_sheet(exportData.map(order => ({
      'Order No.': order.order_number,
      'Customer': order.account_name,
      'Mobile': order.mobile,
      'Date': new Date(order.date).toLocaleDateString('en-GB'),
      'Metal': order.metal,
      'Category': order.category,
      'Sub Category': order.subcategory,
      'Purity': order.purity,
      'Design Name': order.product_design_name,
      'Gross Wt': order.gross_weight,
      'Stone Wt': order.stone_weight,
      'Total Wt': order.total_weight_aw,
      'Total Amt': order.total_price,
      'Order Status': order.order_status,
      'Assigned Status': order.assigned_status,
      'Worker Name': order.worker_name,
      'Work Status': order.work_status,
    })));
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    
    // Generate file name dynamically based on filter state
    const fileName = filteredData.length > 0 ? 'filtered_orders.xlsx' : 'all_orders.xlsx';
  
    XLSX.writeFile(workbook, fileName);
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
        Header: 'Order No.',
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
        Header: 'Purity',
        accessor: 'purity',
      },
      {
        Header: 'Design Name',
        accessor: 'product_design_name',
      },
      {
        Header: 'Gross Wt',
        accessor: 'gross_weight',
      },
      {
        Header: 'Stone Wt',
        accessor: 'stone_weight',
      },
      {
        Header: 'Total Wt',
        accessor: 'total_weight_aw',
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
          const isDisabled = row.original.order_status === "Canceled" || row.original.assigned_status === "Not Assigned"; // Disable if Canceled or Not Assigned

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
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div >
            <FaEdit
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'blue', }}
              onClick={() => handleEdit(row.original.id)}
            />
            <FaTrash
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'red', }}
              onClick={() => handleDelete(row.original.id)}
            />
          </div>
        ),
      },
    ],
    [workers, assignedWorkers]
  );

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="customers-table-container">
          <Row className="mb-3 d-flex justify-content-between align-items-center">
            <Col>
              <h3>Orders</h3>
            </Col>
            <Col className="d-flex justify-content-end gap-2">
              <Button
                className="export_but"
                onClick={exportToExcel}
                style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
              >
                Export to Excel
              </Button>
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
          {/* {loading ? <div>Loading...</div> : <DataTable columns={columns} data={data} onFilterChange={handleFilterChange} />} */}

        </div>
      </div>
    </>
  );
};

export default ViewOrders;
