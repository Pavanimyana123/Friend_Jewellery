import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import './AssignedOrders.css'
import axios from "axios";
import baseURL from '../../../../Url/NodeBaseURL';
import WorkerNavbar from '../../../Pages/Navbar/WorkerNavbar';
import { AuthContext } from "../../../AuthContext/ContextApi";

const AssignedOrders = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1, // Generate a sequential number based on the row index
      },
      {
        Header: 'Date',
        accessor: row => {
          const date = new Date(row.date);
          return date.toLocaleDateString('en-GB'); // Formats as dd/mm/yyyy
        },
      },
      // {
      //   Header: 'Mobile',
      //   accessor: 'mobile',
      // },
      // {
      //   Header: 'Customer Name',
      //   accessor: 'account_name',
      // },
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
        Header: 'Total Amt ',
        accessor: 'total_price',
      },
      {
        Header: 'Order Status',
        accessor: 'order_status',
        Cell: ({ row }) => row.original.order_status || 'N/A',
      },
      {
        Header: "Assigned Status",
        accessor: "assigned_status",
        Cell: ({ row }) => {
          const [status, setStatus] = useState(row.original.assigned_status || "Assigned");
      
          const handleAssignStatusChange = async (event) => {
            const newStatus = event.target.value;
            setStatus(newStatus);
      
            try {
              const response = await axios.put(`${baseURL}/api/orders/assign-status/${row.original.id}`, {
                assigned_status: newStatus, // Updating assigned_status in DB
                worker_id: row.original.worker_id, // Keep worker_id same
                worker_name: row.original.worker_name, // Keep worker_name same
              });
      
              console.log("Work status updated:", response.data);
              alert("Work status updated successfully!");
            } catch (error) {
              console.error("Error updating work status:", error);
              alert("Failed to update work status.");
            }
          };
      
          return (
            <select 
              value={status} 
              onChange={handleAssignStatusChange} 
              disabled={status === "Accepted"} // Completely disable dropdown if status is "Accepted"
            >
              <option value="Assigned">Assigned</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          );
        },
      },
      
      {
        Header: "Work Status",
        accessor: "work_status", // Ensure this matches your backend column name
        Cell: ({ row }) => {
          const [status, setStatus] = useState(row.original.work_status || "Pending");

          const handleStatusChange = async (event) => {
            const newStatus = event.target.value;
            setStatus(newStatus);

            try {
              const response = await axios.put(`${baseURL}/api/orders/work-status/${row.original.id}`, {
                work_status: newStatus, // Updating work_status in DB
                worker_id: row.original.worker_id, // Keep worker_id same
                worker_name: row.original.worker_name, // Keep worker_name same
              });

              console.log("Work status updated:", response.data);
              alert("Work status updated successfully!");
            } catch (error) {
              console.error("Error updating work status:", error);
              alert("Failed to update work status.");
            }
          };

          return (
            <select value={status} onChange={handleStatusChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Hold">Hold</option>
            </select>
          );
        },
      },
      {
        Header: 'Image',
        accessor: 'image_url', // Keep accessor as is
        Cell: ({ value }) => (
          value ? (
            <img
              src={`${baseURL}${value}`} // Construct full image URL
              alt="Order Image"
              style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }}
            />
          ) : (
            'No Image' // Display text if image is missing
          )
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        // Filter orders based on account_id matching user.id
        const filteredData = result.filter(order => order.worker_id === user?.id);

        setData(filteredData); // Set the filtered data
        console.log("Filtered Orders =", filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [baseURL, user]);  // Include user in dependency array to fetch data when user changes


  return (
    <>
      <WorkerNavbar />
      <div className="main-container">
        <div className="customers-table-container">
          <Row className="mb-3">
            <Col className="d-flex justify-content-between align-items-center">
              <h3>Assigned Orders</h3>
            </Col>
          </Row>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DataTable columns={columns} data={[...data].reverse()} />
          )}
        </div>
      </div>
    </>
  );
};

export default AssignedOrders;
