import React from "react";

import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo1 from './Logos/logo.jpeg'
import logo2 from './Logos/logo_dark.png'

// Define styles
const styles = StyleSheet.create({
        page: {
                padding: 5,
                fontSize: 8,

        },
        section: {
                marginBottom: 10,
        },
        row: {
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
        },
        // column: {
        //         width: '33%',
        // },
        boldText: {
                fontWeight: "bold",

        },
        image1: {
                // width: 100,
                // height: 100,
                marginTop: 0,
        },
        image2: {
                // width: 50,
                // height: 50,
                marginTop: 0,
        },
        divider: {
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#000",
                borderBottomStyle: "solid",
        },

        container: {
                flex: 1,
                // justifyContent: 'center', 
                alignItems: 'center',  // Centers the content horizontally
                padding: 20,
                marginTop: -50,
        },
        heading: {
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
                marginBottom: 5,
        },
        contentContainer: {
                flexDirection: 'row',  // Side by side layout
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,  // Horizontal line under both sections
                borderColor: 'black',
                // paddingBottom: 20,
                width: '100%',  // Ensure it spans the entire width
        },
        leftColumn: {
                // flex: 1,
                // paddingLeft: 100,
                marginLeft: 100,
        },
        rightColumn: {
                flex: 1,
                paddingLeft: 10,
        },
        flatNo: {
                marginBottom: 2,
        },
        cin: {
                marginBottom: 2,
        },
        branch: {
                fontWeight: 'bold',
                marginBottom: 2,
        },
        branchContent: {
                marginBottom: 2,
        },
        divider1: {
                width: 1,
                height: '100%',
                backgroundColor: 'black',
        },

        horizontalLine1: {
                width: '100%',  // Set width to 70%
                height: 1,
                // backgroundColor: 'black',
                alignSelf: 'center',  // Centers the line horizontally within its container
                marginBottom: 2,
        },

        horizontalLine: {
                width: '100%',  // Set width to 70%
                height: 1,
                backgroundColor: 'black',
                alignSelf: 'center',  // Centers the line horizontally within its container
                marginBottom: 2,
        },
        boxContainer: {
                width: '100%',
                height: 330,
                marginTop: 5,
                border: '1px solid black',
                marginBottom: 20,
        },
        table: {
                width: '100%',
                borderCollapse: 'collapse',
        },
        tableHeader: {
                backgroundColor: '#f2f2f2',
                fontWeight: 'bold',
                borderBottomWidth: 1,
                borderBottomColor: '#000',
        },
        tableCell: {
                // border: '1px solid #000',
                padding: 5,
                textAlign: 'center',
        },
        tableRow: {
                display: 'flex',
                flexDirection: 'row',
        },
        tableCellHeader: {
                width: '5%',
        },
        tableCellDescription: {
                width: '18%',
        },
        tableCellHSN: {
                width: '9%',
        },
        tableCellQty: {
                width: '5%',
        },
        tableCellPurity: {
                width: '8%',
        },
        tableCellGrossWt: {
                width: '11%',
        },
        tableCellStoneWt: {
                width: '11%',
        },
        tableCellNetWt: {
                width: '11%',
        },
        tableCellRate: {
                width: '10%',
        },
        tableCellMC: {
                width: '8%',
        },
        tableCellStAmt: {
                width: '10%',
        },
        tableCellTotal: {
                width: '10%',
        },

        lastheight: {
                height: 30,
        },
});

const TaxINVoiceReceipt = () => {
        return (
                <Document>
                        <Page size="A4" style={styles.page}>
                                {/* First Row */}
                                <View style={[styles.row, { flexDirection: 'row', justifyContent: 'space-between', marginBottom:'20px' }]}>
                                        <View style={[styles.column, { marginTop: 20, width: '20%', marginLeft: 20, fontFamily: 'Helvetica-Bold' }]}>
                                                <Text style={[styles.boldText, { marginBottom: 6 }]}>CUSTOMER DETAILS:</Text>
                                                <Text style={{ marginBottom: 6 }}>SHUBHA,</Text>

                                                <Text style={{ marginBottom: 6 }}>BANGALORE</Text>
                                                <Text style={{ marginBottom: 6 }}>MOBILE: 9901517112</Text>
                                                <Text style={{ marginBottom: 6 }}>PAN NO: DRXPR9966P</Text>
                                        </View>
                                        <View style={[styles.column, { width: '30%', height: '80px', marginRight: '20px' }]}>
                                                <Image
                                                        style={styles.image1}
                                                        src={logo1}
                                                />
                                        </View>


                                        <View style={[styles.column, { marginTop: 10, width: '20%', marginRight: '20px', fontFamily: 'Helvetica-Bold' }]}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 10, marginLeft: 20 }}>TAX INVOICE</Text>
                                                {/* <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                                        <Barcode value="SV1224" format="CODE128" width={1.5} height={50} />
                                                </View> */}

                                                {/* BILL NO */}
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                                                        <Text>BILL NO:</Text>
                                                        <Text style={{ textAlign: "right", flex: 1 }}>SV1224</Text>
                                                </View>

                                                {/* DATE */}
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                                                        <Text>DATE:</Text>
                                                        <Text style={{ textAlign: "right", flex: 1 }}>29-12-2024</Text>
                                                </View>

                                                {/* STAFF */}
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                                                        <Text>STAFF:</Text>
                                                        <Text style={{ textAlign: "right", flex: 1 }}>SGJ</Text>
                                                </View>

                                                {/* GSTIN */}
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                                                        <Text>GSTIN:</Text>
                                                        <Text style={{ textAlign: "right", flex: 1 }}>29ABMCS9253K1ZG</Text>
                                                </View>
                                        </View>

                                </View>



                                <View style={styles.container}>
                                        {/* Centered Heading */}
                                        <Text style={[styles.heading, { fontFamily: 'Helvetica-Bold' }]}>NEW FRIEND'S JEWELLERY</Text>

                                        {/* Flat No. and Branch section */}
                                        <View style={styles.contentContainer}>

                                                {/* Flat No. Section */}
                                                <View style={styles.leftColumn}>
                                                        <Text style={styles.flatNo}>Flat No : 1323/1324, 16th B Cross Housing </Text>
                                                        <Text style={styles.cin}>Board Colony EWS 3rd Phase, Yelahanka New </Text>
                                                        <Text style={styles.cin}>Town, Bengaluru Urban, Karnataka - 560064.</Text>
                                                        <Text style={styles.cin}>CIN : U46498KA2024PTC185784</Text>

                                                </View>

                                                {/* Vertical Divider */}
                                                <View style={styles.divider1} />

                                                {/* Branch Section */}
                                                <View style={styles.rightColumn}>
                                                        <Text style={[styles.branch, { fontFamily: 'Helvetica-Bold' }]}>BRANCH:</Text>
                                                        <Text style={styles.branchContent}>Shop no. 1 No.2063, Dairy Circle, </Text>
                                                        <Text style={styles.branchContent}> Asha Arcade, 16th B Cross Rd,</Text>
                                                        <Text style={styles.branchContent}>Yalahanka New Town, Bangalore - 064</Text>
                                                </View>
                                        </View>

                                        {/* Horizontal Divider under both sections */}
                                        <View style={styles.horizontalLine1} />

                                        <View>
                                                <Text>
                                                        Mob : 9964644424 EMAIL : sadashri.Yel@gmail.com
                                                </Text>
                                        </View>


                                        <View style={styles.boxContainer}>
                                                <View style={styles.table}>
                                                        <View style={[styles.tableRow, { fontFamily: 'Helvetica-Bold' }]}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}>SI</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}>Description</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}>HSN</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}>Qty</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}>Purity</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}>Gross.Wt(In Gms)</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}>Stone.Wt(In Gms)</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}>Net.Wt(In Gms) </Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}>Rate</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}>MC</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}>St.Amt</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}>Total</Text>
                                                        </View>
                                                        <View style={styles.horizontalLine} />

                                                        {/* Add rows of data below */}
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}>1</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}>GOLD-NOSTPIN GOLD</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}>711311</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}>1</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}>76</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}>0.226</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}>0.226</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}>2330.10</Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}>2</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}>GOLD-NECKLACE</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}>711311</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}>1</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}>916</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}>49.841</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}>49.841</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}>7135.00</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}>9.75%</Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}>390391.54</Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                        <View style={styles.tableRow}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />


                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}></Text>
                                                                <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}></Text>
                                                        </View>
                                                </View>

                                                <View style={[styles.horizontalLine, { marginTop: -2 }]} />

                                                <View style={[styles.tableRow, { fontFamily: 'Helvetica-Bold' }]}>
                                                        <Text style={[styles.tableCell, styles.tableCellHeader, styles.lastheight]}></Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />


                                                        <Text style={[styles.tableCell, styles.tableCellDescription, styles.lastheight]}></Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellHSN, styles.lastheight]}></Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellQty, styles.lastheight]}>2</Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellPurity, styles.lastheight]}></Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellGrossWt, styles.lastheight]}>49.841</Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellStoneWt, styles.lastheight]}></Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellNetWt, styles.lastheight]}>49.841</Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellRate, styles.lastheight]}></Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellMC, styles.lastheight]}></Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellStAmt, styles.lastheight]}></Text>
                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                        <Text style={[styles.tableCell, styles.tableCellTotal, styles.lastheight]}>392721.64</Text>
                                                </View>

                                                <View style={[styles.horizontalLine, { marginTop: -2 }]} />


                                                <View style={{ flexDirection: "row", justifyContent: "space-between", fontFamily: 'Helvetica-Bold' }}>
                                                        {/* Left Side Content */}
                                                        <View style={{ paddingLeft: 10, marginTop: 20 }}>
                                                                <Text style={[styles.bold, { marginBottom: 3 }]}>Cash Recd: 45000.00</Text>

                                                                <Text style={[styles.bold]}>NEFT Recd: 14000.00 #: Bank:</Text>
                                                        </View>

                                                        <View style={{ paddingRight: 10, marginTop: 5 }}>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>Discount:</Text>
                                                                        <Text style={{ textAlign: "right" }}>3.20</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>GST Value:</Text>
                                                                        <Text style={{ textAlign: "right" }}>392718.44</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>CGST @1.50%:  </Text>
                                                                        <Text style={{ textAlign: "right" }}>5890.78</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>SGST @1.50%:  </Text>
                                                                        <Text style={{ textAlign: "right" }}>5890.78</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text style={[styles.bold]}>Net Bill Value:  </Text>
                                                                        <Text style={{ textAlign: "right" }}>404500.00</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>(-) OLD:</Text>
                                                                        <Text style={{ textAlign: "right" }}>345500.00</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text style={[styles.bold]}>Net Amount:</Text>
                                                                        <Text style={{ textAlign: "right" }}>59000.00</Text>
                                                                </View>
                                                        </View>
                                                </View>
                                                <View style={{ alignItems: "center", fontFamily: 'Helvetica-Bold' }}>
                                                        <Text>
                                                                (Rupees Four Lakh Four Thousand Five Hundred Only)
                                                        </Text>
                                                </View>

                                                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between", marginBottom: 3, fontFamily: 'Helvetica-Bold' }}>
                                                        {/* Left Side */}
                                                        <View style={{ alignItems: "flex-start", paddingLeft: 10 }}>
                                                                <Text style={[styles.bold]}>For Customer</Text>
                                                        </View>

                                                        {/* Right Side */}
                                                        <View style={{ alignItems: "flex-end", paddingRight: 10 }}>
                                                                <Text style={[styles.bold]}>For NEW FRIEND'S JEWELLERY</Text>
                                                        </View>
                                                </View>



                                        </View>

                                </View>

                                <View></View>
                        </Page>
                </Document>
        );
};

export default TaxINVoiceReceipt;
