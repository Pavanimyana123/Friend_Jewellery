import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import './ViewOrders.css';
import baseURL from '../../../../Url/NodeBaseURL';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';

const CancelOrders = () => {
  const navigate = useNavigate();
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
        Header: 'Total Amt ',
        accessor: 'total_price',
      },

      {
        Header: 'Order Status',
        accessor: 'order_status',
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
        const response = await fetch(`${baseURL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
  
        // Filter orders where order_status is "Cancelled"
        const cancelledOrders = result.filter(order => order.order_status === "Canceled");
  
        setData(cancelledOrders); // Set only cancelled orders
        console.log("Cancelled Orders:", cancelledOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [baseURL]);

  return (
    <>
    <CustomerNavbar />
    <div className="main-container">
      <div className="customers-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Cancel Orders</h3>          
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

export default CancelOrders;
