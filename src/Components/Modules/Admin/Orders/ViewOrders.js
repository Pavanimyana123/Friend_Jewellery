import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import './ViewOrders.css';
import baseURL from '../../../../Url/NodeBaseURL';
import Navbar from '../../../Pages/Navbar/Navbar';

const ViewOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(`${baseURL}/accounts`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
  
        // Filter only workers
        const workers = result
          .filter((item) => item.account_group === 'WORKER')
          .map((item) => ({
            id: item.id,
            name: item.account_name,
          }));
  
        setWorkers(workers);
        console.log("Workers=", workers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchWorkers();
  }, []);
  
  const [assignedWorkers, setAssignedWorkers] = useState({});
  
  const handleWorkerAssign = (orderId, workerId) => {
    setAssignedWorkers({ ...assignedWorkers, [orderId]: workerId });
  };
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: 'Date',
        accessor: row => {
          const date = new Date(row.date);
          return date.toLocaleDateString('en-GB');
        },
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
      },
      {
        Header: 'Customer Name',
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
        Header: 'Order Status',
        accessor: 'order_status',
      },
      {
        Header: 'Image',
        accessor: 'image',
      },
      {
        Header: 'Assign Worker',
        Cell: ({ row }) => (
          <select
            value={assignedWorkers[row.original.order_number] || ''}
            onChange={(e) => handleWorkerAssign(row.original.order_number, e.target.value)}
          >
            <option value="">Select Worker</option>
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name}
              </option>
            ))}
          </select>
        ),
      },
    ],
    [workers, assignedWorkers]
  );
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [baseURL]);

  const handleCreate = () => {
    navigate('/a-orders');
  };


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
              onClick={handleCreate}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
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

export default ViewOrders;
