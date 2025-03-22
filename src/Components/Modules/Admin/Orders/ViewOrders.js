import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/DataTable';
import { Button, Row, Col } from 'react-bootstrap';
import './ViewOrders.css';
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import baseURL from '../../../../Url/NodeBaseURL';
import Navbar from '../../../Pages/Navbar/Navbar';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Ensure this is installed and imported
import * as XLSX from 'xlsx';
import { pdf } from "@react-pdf/renderer";
import TaxINVoiceReceipt from "./TaxInvoiceA4";
import { saveAs } from "file-saver";

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
          worker_id: workerId,
          worker_name: workerName,
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

  // const handleRowSelect = (rowId) => {
  //   setSelectedRows((prevSelected) =>
  //     prevSelected.includes(rowId)
  //       ? prevSelected.filter((id) => id !== rowId)
  //       : [...prevSelected, rowId]
  //   );
  // };

  // const handleSelectAll = () => {
  //   if (selectedRows.length === data.length) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(data.map((row) => row.id));
  //   }
  // };


  // const downloadPDF = () => {
  //   if (selectedRows.length === 0) {
  //     alert("Please select at least one order to download.");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   doc.text("Selected Orders", 10, 10);

  //   // Prepare data for the table
  //   const tableData = selectedRows.map((id) => {
  //     const row = data.find((order) => order.id === id);
  //     return [row.id, row.date, row.account_name, row.order_number, row.metal, row.total_price];
  //   });

  //   // Use autoTable to create the table
  //   autoTable(doc, {
  //     head: [["ID", "Date", "Customer", "Order No.", "Metal", "Total Amount"]],
  //     body: tableData,
  //   });

  //   doc.save("Selected_Orders.pdf");
  // };

  const handleRowSelect = (rowId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

  // Function to generate and download PDF directly
const downloadPDF = async () => {
  if (selectedRows.length === 0) {
    alert("Please select at least one order to download.");
    return;
  }

  // Prepare selected data
  const selectedOrders = data.filter((order) => selectedRows.includes(order.id));
  setSelectedData(selectedOrders);

  // Generate PDF Blob
  const doc = <TaxINVoiceReceipt selectedOrders={selectedOrders} />;
  const pdfBlob = await pdf(doc).toBlob();

  // Trigger download
  saveAs(pdfBlob, "Invoice.pdf");

  // Clear selection
  // setSelectedRows([]);
};

  // const downloadPDF = () => {
  //   if (selectedRows.length === 0) {
  //     alert("Please select at least one order to download.");
  //     return;
  //   }

  //   const doc = new jsPDF();

  //   // Company Header
  //   doc.setFontSize(16);
  //   doc.text("Company Name", 10, 15);
  //   doc.setFontSize(10);
  //   doc.text("M/S NEW FRIENDS JEWELLERS", 10, 22);
  //   doc.text("Phone: 1234567890 | Email: friendsjewellery@gmail.com", 10, 28);
  //   doc.text("----------------------------------------------------", 10, 32);

  //   // Invoice Title
  //   doc.setFontSize(14);
  //   doc.text("INVOICE", 90, 40);

  //   // Invoice Metadata
  //   const dateObj = new Date();
  //   const date = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

  //   doc.setFontSize(10);
  //   doc.text(`Invoice Date: ${date}`, 150, 50);


  //   // Prepare order data
  //   const tableData = selectedRows.map((id, index) => {
  //     const row = data.find((order) => order.id === id);
  //     if (!row) return []; // Prevents errors if row is undefined

  //     const totalPrice = parseFloat(row.total_price) || 0; // Convert safely
  //     return [
  //       index + 1,
  //       row.order_number || "N/A",
  //       row.account_name || "N/A",
  //       row.subcategory || "N/A",
  //       row.product_design_name || "N/A",
  //       row.purity || "N/A",
  //       row.gross_weight || "N/A",
  //       row.stone_weight || "N/A",
  //       row.total_weight_aw || "N/A",  
  //       `$${totalPrice.toFixed(2)}`,
  //     ];
  //   });

  //   // Ensure there is data to display
  //   if (tableData.length === 0) {
  //     alert("No valid data to generate a PDF.");
  //     return;
  //   }

  //   // Generate Invoice Table and Get `finalY`
  //   autoTable(doc, {
  //     startY: 60,
  //     head: [
  //       [
  //         "SI",
  //         "Order No.",
  //         "Customer",
  //         "Sub Category",
  //         "Design Name",
  //         "Purity",
  //         "Gross Wt",
  //         "Stone Wt",
  //         "Total Wt",
  //         "Total Amount",
  //       ],
  //     ],
  //     body: tableData,
  //     theme: "striped",
  //     styles: { fontSize: 8 }, // Decrease body font size
  //     headStyles: { fillColor: [44, 62, 80], fontSize: 9 }, // Decrease header font size
  //   });


  //   // Get `finalY` safely
  //   const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 70;

  //   // Calculate Total Amount
  //   const totalAmount = tableData.reduce((sum, row) => {
  //     const price = parseFloat(row[9]?.replace("$", "")) || 0;
  //     return sum + price;
  //   }, 0);

  //   // Total Amount Section
  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "bold");
  //   doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 140, finalY + 10);
  //   doc.setFont("helvetica", "normal");

  //   // Footer Section
  //   doc.setFontSize(10);
  //   doc.text("Thank you for your business!", 10, finalY + 20);
  //   doc.text("Terms & Conditions: Payment is due within 15 days.", 10, finalY + 30);

  //   doc.save("Invoice.pdf");

  //   setSelectedRows([]);
  // };

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <input
            type="checkbox"
            checked={selectedRows.length === data.length && data.length > 0}
            onChange={handleSelectAll}
          />
        ),
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.original.id)}
            onChange={() => handleRowSelect(row.original.id)}
          />
        ),
        id: 'select', // Add an ID for the select column
      },
      { Header: 'Sr. No.', Cell: ({ row }) => row.index + 1, id: 'sr_no' },
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
        Header: 'Metal',
        accessor: 'metal',
        id: 'metal', // Add an ID for the metal column
      },
      {
        Header: 'Category',
        accessor: 'category',
        id: 'category', // Add an ID for the category column
      },
      {
        Header: 'Sub Category',
        accessor: 'subcategory',
        id: 'sub_category', // Add an ID for the subcategory column
      },
      {
        Header: 'Purity',
        accessor: 'purity',
        id: 'purity', // Add an ID for the purity column
      },
      {
        Header: 'Design Name',
        accessor: 'product_design_name',
        id: 'design_name', // Add an ID for the design name column
      },
      {
        Header: 'Gross Wt',
        accessor: 'gross_weight',
        id: 'gross_weight', // Add an ID for the gross weight column
      },
      {
        Header: 'Stone Wt',
        accessor: 'stone_weight',
        id: 'stone_weight', // Add an ID for the stone weight column
      },
      {
        Header: 'Total Wt',
        accessor: 'total_weight_aw',
        id: 'total_weight', // Add an ID for the total weight column
      },
      {
        Header: 'Total Amt',
        accessor: 'total_price',
        id: 'total_amt', // Add an ID for the total amount column
      },
      {
        Header: "Order Status",
        accessor: "order_status",
        id: 'order_status', // Add an ID for the order status column
        Cell: ({ row }) => {
          const [status, setStatus] = useState(row.original.order_status || "Placed");
          const isPending = row.original.work_status === "Pending"; // Check if work_status is Pending
          const isDisabled = row.original.order_status === "Canceled" || row.original.assigned_status === "Not Assigned"; // Disable if Canceled or Not Assigned

          const handleStatusChange = async (event) => {
            const newStatus = event.target.value;
            setStatus(newStatus);

            try {
              const response = await axios.put(`${baseURL}/api/orders/status/${row.original.id}`, {
                order_status: newStatus,
                worker_id: row.original.worker_id,
                worker_name: row.original.worker_name,
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
      {
        Header: 'Image',
        accessor: 'image_url',
        id: 'image', // Add an ID for the image column
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
                newWindow.document.close();
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
        id: 'assign_worker', // Add an ID for the assign worker column
        Cell: ({ row }) => {
          const assignedWorkerName = row.original.worker_name;
          const isDisabled = row.original.assigned_status === 'Accepted';

          return (
            <select
              value={assignedWorkerName || ''}
              onChange={(e) => {
                const selectedWorker = workers.find(worker => worker.account_name === e.target.value);
                updateOrderWithWorker(row.original.id, selectedWorker?.id, selectedWorker?.account_name);
              }}
              disabled={isDisabled}
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
        id: 'assigned_status', // Add an ID for the assigned status column
        Cell: ({ row }) => row.original.assigned_status || '',
      },
      {
        Header: 'Worker Name',
        accessor: 'worker_name',
        id: 'worker_name', // Add an ID for the worker name column
        Cell: ({ row }) => row.original.worker_name || 'N/A',
      },
      {
        Header: 'Work Status',
        accessor: 'work_status',
        id: 'work_status', // Add an ID for the work status column
        Cell: ({ row }) => (
          <span style={{ color: row.original.work_status === 'Pending' ? 'red' : 'black' }}>
            {row.original.work_status || 'N/A'}
          </span>
        ),
      },
      {
        Header: 'Action',
        id: 'action', // Add an ID for the action column
        Cell: ({ row }) => (
          <div>
            <FaEdit
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'blue' }}
              onClick={() => handleEdit(row.original.id)}
            />
            <FaTrash
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}
              onClick={() => handleDelete(row.original.id)}
            />
          </div>
        ),
      },
    ],
    [workers, assignedWorkers, selectedRows, data]
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
              <Button onClick={downloadPDF} disabled={selectedRows.length === 0}>
                Generate Invoice
              </Button>
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
      {/* {selectedData.length > 0 && (
      <PDFDownloadLink
        document={<TaxINVoiceReceipt selectedOrders={selectedData} />}
        fileName="Invoice.pdf"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download Invoice")}
      </PDFDownloadLink>
    )} */}
    </>
  );
};

export default ViewOrders;