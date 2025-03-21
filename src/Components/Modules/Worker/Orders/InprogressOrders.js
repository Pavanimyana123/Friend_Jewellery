import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/DataTable';
import { Row, Col } from 'react-bootstrap';
import './InprogressOrders.css';
import axios from "axios";
import baseURL from '../../../../Url/NodeBaseURL';
import WorkerNavbar from '../../../Pages/Navbar/WorkerNavbar';
import { AuthContext } from "../../../AuthContext/ContextApi";

const InprogressOrders = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo(
    () => [
      { Header: 'Sr. No.', Cell: ({ row }) => row.index + 1 },
      {
        Header: 'Order Date',
        accessor: row => {
          const date = new Date(row.date);
          return date.toLocaleDateString('en-GB'); // Formats as dd/mm/yyyy
        },
      },
      {
        Header: 'Delivery Date',
        accessor: row => {
          const date = new Date(row.delivery_date);
          return date.toLocaleDateString('en-GB'); // Formats as dd/mm/yyyy
        },
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
      { Header: 'Order Status', accessor: 'order_status', Cell: ({ row }) => row.original.order_status || 'N/A' },
      {
        Header: 'Work Status', 
        accessor: 'work_status',
        Cell: ({ row }) => (
          <span style={{ color: row.original.work_status === 'In Progress' ? 'orange' : 'black' }}>
            {row.original.work_status || 'N/A'}
          </span>
       ),
      },
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
      }  
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/orders`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const result = response.data;

        // Filter orders where work_status is "In Progress"
        const filteredData = result.filter(order => order.worker_id === user?.id && order.work_status === "In Progress");

        setData(filteredData);
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
  }, [user]);

  return (
    <>
      <WorkerNavbar />
      <div className="main-container">
        <div className="customers-table-container">
          <Row className="mb-3">
            <Col className="d-flex justify-content-between align-items-center">
              <h3>In Progress Orders</h3>
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

export default InprogressOrders;