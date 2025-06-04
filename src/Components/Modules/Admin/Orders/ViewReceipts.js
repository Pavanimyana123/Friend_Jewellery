import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../Pages/InputField/TableLayout";
import { Row, Col, Modal } from "react-bootstrap";
import "./ViewOrders.css";
import baseURL from "../../../../Url/NodeBaseURL";
import Navbar from "../../../Pages/Navbar/Navbar";

const ViewReceipts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/receipts`);
      if (!response.ok) throw new Error("Failed to fetch receipts");
      
      const result = await response.json();
      
      // Handle different response formats
      let receipts = [];
      if (Array.isArray(result)) {
        receipts = result;
      } else if (result.data && Array.isArray(result.data)) {
        receipts = result.data;
      } else {
        console.warn("Unexpected API response format:", result);
      }
      
      setData(receipts.reverse());
    } catch (error) {
      console.error("Error fetching receipts:", error);
      setData([]); // Ensure data is always an array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Sr. No.", Cell: ({ row }) => row.index + 1 },
      { Header: "Date", accessor: "date" },
      { Header: "Receipt No.", accessor: "receipt_no" },
      { Header: "Mobile", accessor: "mobile" },
      { Header: "Customer", accessor: "account_name" },
      { Header: "Order No.", accessor: "order_number" },
      { 
        Header: "Total Amount", 
        accessor: "total_amt",
        Cell: ({ value }) => `₹${parseFloat(value || 0).toFixed(2)}`
      },
      { 
        Header: "Paid Amount", 
        accessor: "paid_amt",
        Cell: ({ value }) => `₹${parseFloat(value || 0).toFixed(2)}`
      },
      { 
        Header: "Balance Amount", 
        accessor: "bal_amt",
        Cell: ({ value }) => `₹${parseFloat(value || 0).toFixed(2)}`
      },
    ],
    []
  );

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="customers-table-container">
          <Row className="mb-3">
            <Col>
              <h3>Receipts</h3>
            </Col>
          </Row>

          {loading ? (
            <div>Loading receipts...</div>
          ) : (
            <DataTable 
              columns={columns} 
              data={data} 
              emptyMessage="No receipts found"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ViewReceipts;