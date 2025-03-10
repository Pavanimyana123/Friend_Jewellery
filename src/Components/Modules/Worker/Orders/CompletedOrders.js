import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout';
import { Row, Col } from 'react-bootstrap';
import './CompletedOrders.css'
import axios from "axios";
import baseURL from '../../../../Url/NodeBaseURL';
import WorkerNavbar from '../../../Pages/Navbar/WorkerNavbar';
import { AuthContext } from "../../../AuthContext/ContextApi";

const CompletedOrders = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo(
    () => [
      { Header: 'Sr. No.', Cell: ({ row }) => row.index + 1 },
      { Header: 'Date', accessor: row => new Date(row.date).toLocaleDateString('en-GB') },
      // { Header: 'Mobile', accessor: 'mobile' },
      // { Header: 'Customer Name', accessor: 'account_name' },
      { Header: 'Order Number', accessor: 'order_number' },
      { Header: 'Metal', accessor: 'metal' },
      { Header: 'Category', accessor: 'category' },
      { Header: 'Sub Category', accessor: 'subcategory' },
      { Header: 'Total Amt ', accessor: 'total_price' },
      { Header: 'Order Status', accessor: 'order_status', Cell: ({ row }) => row.original.order_status || 'N/A' },
      { Header: 'Work Status', accessor: 'work_status' },
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
        const response = await axios.get(`${baseURL}/api/orders`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const result = response.data;

        // Filter orders where work_status is "Completed"
        const filteredData = result.filter(order => order.worker_id === user?.id && order.work_status === "Completed");

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
              <h3>Completed Orders</h3>
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

export default CompletedOrders;