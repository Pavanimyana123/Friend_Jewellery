import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/DataTable';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import './ViewOrders.css';
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import baseURL from '../../../../Url/NodeBaseURL';
import Navbar from '../../../Pages/Navbar/Navbar';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Ensure this is installed and imported
import * as XLSX from 'xlsx';
import { pdf } from "@react-pdf/renderer";
import TaxINVoiceReceipt from "./TaxInvoiceA4";
import EstimateReceipt from './EstimateReceipt';
import { saveAs } from "file-saver";
import Swal from 'sweetalert2';

const ViewOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [assignedWorkers, setAssignedWorkers] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedData, setSelectedData] = useState([]); // Store selected row details
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  // Create a separate component for the status dropdown
  const StatusDropdown = ({ product, fetchData }) => {
    const [status, setStatus] = useState(product.order_status || "Placed");
    const isPending = product.work_status === "Pending";
    const isDisabled = product.order_status === "Canceled" || product.assigned_status === "Not Assigned";

    const handleStatusChange = async (event) => {
      const newStatus = event.target.value;
      setStatus(newStatus);

      try {
        const response = await axios.put(`${baseURL}/api/orders/status/${product.id}`, {
          order_status: newStatus,
          worker_id: product.worker_id,
          worker_name: product.worker_name,
        });

        console.log("Status updated:", response.data);
        alert("Order status updated successfully!");
        fetchData();
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
        <option value="Delivered" disabled={isPending}>Delivered</option>
        <option value="Canceled" disabled={isPending}>Cancel</option>
      </select>
    );
  };

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

  //  const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${baseURL}/api/orders`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch orders');
  //     }
  //     const result = await response.json();

  //     // Filter out orders with order_status "Delivered"
  //     const filteredData = result.filter(order => order.order_status !== 'Delivered');

  //     setData(filteredData);
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/get-unique-order-details`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const result = await response.json();
      setData(result); // Set all data without filtering
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

 const updateOrderWithWorker = async (orderId, workerId, workerName) => {
  try {
    const response = await fetch(`${baseURL}/api/orders/assign/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assigned_status: workerId ? 'Assigned' : 'Not Assigned',
        worker_id: workerId,
        worker_name: workerName,
        work_status: 'Pending',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order');
    }

    // Update the modal state immediately
    if (selectedOrder) {
      setSelectedOrder(prev => ({
        ...prev,
        repeatedData: prev.repeatedData.map(item => 
          item.id === orderId 
            ? { 
                ...item,
                assigned_status: workerId ? 'Assigned' : 'Not Assigned',
                worker_id: workerId,
                worker_name: workerName,
                work_status: 'Pending'
              }
            : item
        )
      }));
    }

    // Optional: Refresh the main data if needed
    fetchData();
  } catch (error) {
    console.error('Error updating order:', error);
  }
};

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this order?")) {
  //     return;
  //   }

  //   try {
  //     await axios.delete(`${baseURL}/api/delete-order/${id}`);
  //     alert("Order deleted successfully");
  //     setOrders(orders.filter(order => order.id !== id)); // Update state after deletion
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //     alert("Failed to delete order");
  //   }
  // };


  const handleDelete = async (orderNumber) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      await axios.delete(`${baseURL}/api/deleteorder/${orderNumber}`);
      alert("Order deleted successfully");
      setOrders(orders.filter(order => order.order_number !== orderNumber)); // Update state after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };


  // const handleEdit = (id) => {
  //   navigate(`/a-edit-order/${id}`);
  // };

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

  const handleRowSelect = (rowId) => {
    const selectedOrder = data.find((order) => order.id === rowId);

    if (selectedRows.length > 0) {
      const firstSelectedOrder = data.find((order) => order.id === selectedRows[0]);

      // Check if the selected mobile number is different
      if (selectedOrder.mobile !== firstSelectedOrder.mobile) {
        alert("You can only select orders with the same mobile number.");
        return;
      }
    }

    // Proceed with selection logic
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]); // Deselect all if already selected
      return;
    }

    if (data.length === 0) return; // No data available

    const firstMobileNumber = data[0].mobile; // Get the mobile number of the first order

    // Filter orders that match the first mobile number
    const sameMobileOrders = data.filter((order) => order.mobile === firstMobileNumber);

    if (sameMobileOrders.length !== data.length) {
      alert("You can only select orders with the same mobile number.");
      return;
    }

    // Select only orders with the same mobile number
    setSelectedRows(sameMobileOrders.map((row) => row.id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "red";
      case "Completed":
        return "green";
      case "In Progress":
        return "orange"; // Warning color
      case "Hold":
        return "orange";
      default:
        return "black";
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'S No.', Cell: ({ row }) => row.index + 1, id: 'sr_no' },
      {
        Header: 'Date',
        accessor: (row) => {
          const date = new Date(row.date);
          return date.toLocaleDateString('en-GB');
        },
        id: 'date', // Add an ID for the date column
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
        id: 'mobile', // Add an ID for the mobile column
      },
      {
        Header: 'Customer',
        accessor: 'account_name',
        id: 'customer', // Add an ID for the customer column
      },
      {
        Header: 'Order No.',
        accessor: 'order_number',
        id: 'order_no', // Add an ID for the order number column
      },
      {
        Header: 'Total Wt',
        accessor: 'overall_total_weight',
        id: 'overall_total_weight', // Add an ID for the total weight column
      },
      {
        Header: 'Fine Wt',
        accessor: 'fine_wt',
        id: 'fine_wt', // Add an ID for the total weight column
      },
      {
        Header: 'Net Wt',
        accessor: 'net_wt',
        id: 'net_wt', // Add an ID for the total weight column
      },
      {
        Header: 'Total Amt',
        accessor: 'overall_total_price',
        id: 'overall_total_price', // Add an ID for the total amount column
      },
      {
        Header: 'Summary Price',
        accessor: 'summary_price',
        id: 'summary_price', // Add an ID for the total weight column
      },
      {
        Header: 'Advance Amt',
        accessor: 'advance_amount',
        id: 'advance_amount', // Add an ID for the total weight column
      },
      {
        Header: 'Balance Amt',
        accessor: 'balance_amt',
        id: 'balance_amt', // Add an ID for the total weight column
      },
     {
  Header: "Invoice",
  Cell: ({ row }) => {
    const invoiceGenerated = row.original.invoice_generated === "Yes";
    const invoiceNumber = row.original.invoice_number;
    const [isReadyForInvoice, setIsReadyForInvoice] = useState(false);

    // Check if all orders with this order_number are "Ready for Delivery"
    useEffect(() => {
      const checkOrderStatus = async () => {
        try {
          const response = await fetch(`${baseURL}/get-order-details/${row.original.order_number}`);
          if (!response.ok) {
            throw new Error('Failed to fetch order details');
          }
          const result = await response.json();
          const allReady = result.every(order => order.order_status === "Ready for Delivery");
          setIsReadyForInvoice(allReady);
        } catch (error) {
          console.error('Error checking order status:', error);
          setIsReadyForInvoice(false);
        }
      };

      checkOrderStatus();
    }, [row.original.order_number]);

    return invoiceGenerated && invoiceNumber ? (
      <a
        href={`${baseURL}/invoices/${invoiceNumber}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        📝 View
      </a>
    ) : (
      <Button
        style={{
          backgroundColor: isReadyForInvoice ? '#28a745' : '#6c757d',
          borderColor: isReadyForInvoice ? '#28a745' : '#6c757d',
          fontSize: '0.800rem',
          padding: '0.10rem 0.5rem',
        }}
        onClick={() => handleGenerateInvoice(row.original.order_number)}
        disabled={!isReadyForInvoice}
      >
        Generate
      </Button>
    );
  },
  id: "invoice",
},

      {
        Header: "Estimate",
        Cell: ({ row }) => {
          const estimateGenerated = row.original.estimate_generated === "Yes";
          const estimateNumber = row.original.estimate_number;

          return estimateGenerated && estimateNumber ? (
            <a
              href={`${baseURL}/invoices/${estimateNumber}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              📝 View
            </a>
          ) : (
            <Button
              onClick={() => handleGenerateEstimate(row.original.order_number)}
              style={{
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                fontSize: '0.800rem', // Smaller font size
                padding: '0.10rem 0.5rem', // Reduced padding
              }}
            >
              Generate
            </Button>
          );
        },
        id: "estimate",
      },
      {
        Header: 'Receipt',
        id: 'add_receipts',
        Cell: ({ row }) => {
          const isDisabled = parseFloat(row.original.balance_amt) === parseFloat(row.original.receipt_amt);

          return (
            <Button
              style={{
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                fontSize: '0.800rem', // Smaller font size
                padding: '0.10rem 0.5rem', // Reduced padding
              }}

              onClick={() =>
                navigate(`/a-receipts`, {
                  state: { order: row.original },
                })
              }
              disabled={isDisabled}
            >
              Add Receipts
            </Button>
          );
        },
      },
      {
        Header: 'Action',
        id: 'action', // Add an ID for the action column
        Cell: ({ row }) => (
          <div>
            <FaEye
              style={{ cursor: 'pointer', color: 'green' }}
              onClick={() => handleView(row.original)}
            />
            <FaEdit
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'blue' }}
              onClick={() => handleEdit(row.original.order_number,
                row.original.mobile,
                row.original.advance_gross_wt,
                row.original.fine_wt,
                row.original.advance_amount,)}
            />
            <FaTrash
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}
              // onClick={() => handleDelete(row.original.id)}
              onClick={() => handleDelete(row.original.order_number)}
            />
          </div>
        ),
      },
    ],
    [workers, assignedWorkers, selectedRows, data]
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleView = async (order) => {
    try {
      const response = await fetch(`${baseURL}/get-order-details/${order.order_number}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const result = await response.json();
      setSelectedOrder(result);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to load order details');
    }
  };

  const handleEdit = async (
    order_number, mobile, advance_gross_wt, fine_wt, advance_amount
  ) => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to edit this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, go ahead!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      try {
        // Fetch repair details
        const response = await axios.get(`${baseURL}/get-order-details/${order_number}`);
        const details = response.data;

        // Verify if the API returned data
        if (!details || !details.repeatedData) {
          console.error('No repeatedData found in response:', details);
          Swal.fire('Error', 'No repair details found for the provided order number.', 'error');
          return;
        }

        // Retrieve existing repair details from localStorage or set to an empty array if not available
        const existingDetails = JSON.parse(localStorage.getItem('orders')) || [];

        // Get today's date in yyyy-mm-dd format
        const today = new Date().toISOString().split('T')[0];

        // Update repeatedData with today's date
        const formattedDetails = details.repeatedData.map((item) => ({
          ...item,
          date: today,
          order_number, // Ensure the order_number is explicitly included
        }));
        const updatedDetails = [...existingDetails, ...formattedDetails];
        localStorage.setItem('orders', JSON.stringify(updatedDetails));


        console.log('Updated repair details added to localStorage:', updatedDetails);

        // Navigate to the sales page with state
        navigate('/a-orders', {
          state: {
            order_number,
            mobile,
            advance_gross_wt, fine_wt, advance_amount,
            orderDetails: details,
          },
        });
      } catch (error) {
        console.error('Error fetching repair details:', error);
        Swal.fire('Error', 'Unable to fetch repair details. Please try again.', 'error');
      }
    } else {
      Swal.fire('Cancelled', 'Edit operation was cancelled.', 'info');
    }
  };

  const generateInvoiceNumber = (latestInvoice) => {
    if (!latestInvoice) return "INV001"; // Start from INV001 if none exist

    // Extract the numeric part and increment it
    const match = latestInvoice.match(/INV(\d+)/);
    if (match) {
      const nextNumber = String(parseInt(match[1]) + 1).padStart(3, "0"); // Increment and pad
      return `INV${nextNumber}`;
    }

    return "INV001"; // Fallback
  };

  const generateEstimateNumber = (latestEstimate) => {
    if (!latestEstimate) return "EST001"; // Start from EST001 if none exist

    const match = latestEstimate.match(/EST(\d+)/);
    if (match) {
      const nextNumber = String(parseInt(match[1]) + 1).padStart(3, "0"); // Increment and pad
      return `EST${nextNumber}`;
    }

    return "EST001"; // Fallback
  };

  const handleGenerateEstimate = async (orderNumber) => {
    try {
      // 🔄 Fetch full order data using order_number
      const response = await fetch(`${baseURL}/get-order-details/${orderNumber}`);
      if (!response.ok) throw new Error("Failed to fetch order details");

      const fullOrder = await response.json();
      const selectedOrders = fullOrder.repeatedData;

      // 🧾 Fetch latest estimate number
      const estimateRes = await fetch(`${baseURL}/api/get-latest-estimate`);
      const estimateData = await estimateRes.json();
      const newEstimateNumber = generateEstimateNumber(estimateData.latestEstimateNumber);

      // 📄 Generate Estimate PDF
      const doc = (
        <EstimateReceipt
          selectedOrders={selectedOrders}
          estimateNumber={newEstimateNumber}
          uniqueData={fullOrder.uniqueData} // optional, if EstimateReceipt uses it
        />
      );

      const pdfBlob = await pdf(doc).toBlob();
      saveAs(pdfBlob, `${newEstimateNumber}.pdf`);

      await handleSavePDFToServer(pdfBlob, newEstimateNumber);

      // ✅ Update estimate status in DB (using order_number)
      await fetch(`${baseURL}/api/update-estimate-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumbers: [orderNumber], // 👈 send order_numbers instead of ids
          estimateNumber: newEstimateNumber,
        }),
      });

      alert(`Estimate ${newEstimateNumber} generated successfully`);
      fetchData(); // refresh table
    } catch (error) {
      console.error("Error generating estimate:", error);
      alert("Failed to generate estimate.");
    }
  };

  const handleGenerateInvoice = async (orderNumber) => {
    try {
      // 🔄 Fetch full order data using order_number
      const response = await fetch(`${baseURL}/get-order-details/${orderNumber}`);
      if (!response.ok) throw new Error("Failed to fetch order details");

      const fullOrder = await response.json();
      const selectedOrders = fullOrder.repeatedData;

      // 🧾 Fetch latest invoice number
      const invoiceRes = await fetch(`${baseURL}/api/get-latest-invoice`);
      const invoiceData = await invoiceRes.json();
      const newInvoiceNumber = generateInvoiceNumber(invoiceData.latestInvoiceNumber);

      // 📄 Generate Estimate PDF
      const doc = (
        <TaxINVoiceReceipt
          selectedOrders={selectedOrders}
          invoiceNumber={newInvoiceNumber}
          uniqueData={fullOrder.uniqueData} // optional, if EstimateReceipt uses it
        />
      );

      const pdfBlob = await pdf(doc).toBlob();
      saveAs(pdfBlob, `${newInvoiceNumber}.pdf`);

      await handleSavePDFToServer(pdfBlob, newInvoiceNumber);

      // ✅ Update estimate status in DB (using order_number)
      await fetch(`${baseURL}/api/update-invoice-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumbers: [orderNumber], // 👈 send order_numbers instead of ids
          invoiceNumber: newInvoiceNumber,
        }),
      });

      alert(`Invoice ${newInvoiceNumber} generated successfully`);
      fetchData(); // refresh table
    } catch (error) {
      console.error("Error generating estimate:", error);
      alert("Failed to generate estimate.");
    }
  };

  const handleSavePDFToServer = async (pdfBlob, invoiceNumber) => {
    const formData = new FormData();
    formData.append("invoice", pdfBlob, `${invoiceNumber}.pdf`);

    try {
      const response = await fetch(`${baseURL}/api/upload-invoice`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload invoice");
      }

      console.log(`Invoice ${invoiceNumber} saved on server`);
    } catch (error) {
      console.error("Error uploading invoice:", error);
    }
  };




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
              {/* <Button onClick={downloadEstimatePDF} disabled={selectedRows.length === 0}>
                Generate Estimate
              </Button>
              <Button onClick={downloadPDF} disabled={selectedRows.length === 0}>
                Generate Invoice
              </Button> */}
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
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Order Details - {selectedOrder?.uniqueData?.order_number}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="admin-order-details-container">
              <div className="admin-customer-info-section">
                <h5>Customer Info</h5>
                <div className="admin-customer-details">
                  <div><strong>Account Name:</strong> {selectedOrder.uniqueData.account_name}</div>
                  <div><strong>Mobile:</strong> {selectedOrder.uniqueData.mobile}</div>
                  {/* <div><strong>Email:</strong> {selectedOrder.uniqueData.email || 'N/A'}</div>
            <div><strong>Address:</strong> {selectedOrder.uniqueData.address1 || 'N/A'}</div> */}
                  {selectedOrder.uniqueData.invoice_number && (
                    <div><strong>Invoice Number:</strong> {selectedOrder.uniqueData.invoice_number}</div>
                  )}
                  <div><strong>Total Amount:</strong> {selectedOrder.uniqueData.overall_total_price}</div>
                  <div><strong>Balance Amount:</strong> {selectedOrder.uniqueData.balance_amt}</div>
                </div>
              </div>

              <div className="admin-products-section mt-4">
                <h5>Products</h5>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Invoice Number</th>
                        <th>Metal</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Design Name</th>
                        <th>Purity</th>
                        <th>Gross Wt</th>
                        <th>Stone Wt</th>
                        <th>Total Wt</th>
                        <th>Rate</th>
                        <th>Total Price</th>
                        <th>Image</th>
                        <th>Order Status</th>
                        <th>Assign Worker</th>
                        <th>Assigned Status</th>
                        <th>Worker Name</th>
                        <th>Work Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.repeatedData.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product.invoice_number || 'N/A'}</td>
                          <td>{product.metal}</td>
                          <td>{product.category}</td>
                          <td>{product.subcategory}</td>
                          <td>{product.product_design_name}</td>
                          <td>{product.purity}</td>
                          <td>{product.gross_weight}</td>
                          <td>{product.stone_weight}</td>
                          <td>{product.total_weight_aw}</td>
                          <td>{product.rate}</td>
                          <td>{product.total_price}</td>
                          <td>
                            {product.image_url ? (
                              <img
                                src={`${baseURL}${product.image_url}`}
                                alt="Order"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "5px",
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleImageClick(`${baseURL}${product.image_url}`)}
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                          <td>
                            <StatusDropdown product={product} fetchData={fetchData} />
                          </td>
                          <td>
                            <select
                              value={product.worker_name || ''}
                              onChange={(e) => {
                                const selectedWorker = workers.find(worker => worker.account_name === e.target.value);
                                updateOrderWithWorker(product.id, selectedWorker?.id, selectedWorker?.account_name);
                              }}
                              disabled={product.assigned_status === 'Accepted'}
                            >
                              <option value="">Select Worker</option>
                              {workers.map((worker) => (
                                <option key={worker.id} value={worker.account_name}>
                                  {worker.account_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>{product.assigned_status || ''}</td>
                          <td>{product.worker_name || 'N/A'}</td>
                          <td>
                            <span style={{ color: getStatusColor(product.work_status) }}>
                              {product.work_status || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="total-amount-section text-end mt-3">
                <h5>Total Amount: {selectedOrder.uniqueData.overall_total_price}</h5>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
};

export default ViewOrders;