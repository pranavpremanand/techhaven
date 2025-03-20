import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { companyDetails } from "@/content/constant";

export const createUrlParam = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove all special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with single hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .trim() // Remove leading/trailing spaces
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

// Define styles
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: { marginBottom: 10 },
  heading: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 3 },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
  },
  tableHeader: { backgroundColor: "#f2f2f2", fontWeight: "bold" },
  tableCell: { padding: 5, flex: 1, fontSize: 10 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

// Create Invoice Document
const InvoiceDocument = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo and Title */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={styles.title}>Invoice</Text>
      </View>

      {/* Invoice Info */}
      <View style={styles.section}>
        <Text style={styles.text}>Invoice Number: {invoiceData.invoiceNo}</Text>
        <Text style={styles.text}>Date: {invoiceData.date}</Text>
      </View>

      {/* Seller and Customer Details in two columns */}
      <View style={styles.addressContainer}>
        {/* Seller Details (From) */}
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.heading}>From:</Text>
          <Text style={styles.text}>{companyDetails.name}</Text>
          <Text style={styles.text}>{companyDetails.location}</Text>
          <Text style={styles.text}>Phone: {companyDetails.phone}</Text>
          <Text style={styles.text}>Email: {companyDetails.email}</Text>
          {/* <Text style={styles.text}>GST: {invoiceData.seller?.gst || "GST Number"}</Text> */}
        </View>

        {/* Customer Details (Bill To) */}
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.heading}>Bill To:</Text>
          <Text style={styles.text}>
            {invoiceData.address.firstName} {invoiceData.address.lastName}
          </Text>
          <Text style={styles.text}>{invoiceData.address.address}</Text>
          <Text style={styles.text}>
            {invoiceData.address.city}, {invoiceData.address.state}{" "}
            {invoiceData.address.pinCode}
          </Text>
          <Text style={styles.text}>{invoiceData.address.country}</Text>
          <Text style={styles.text}>Phone: {invoiceData.address.phone}</Text>
          <Text style={styles.text}>Email: {invoiceData.address.email}</Text>
        </View>
      </View>

      {/* Product Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Price</Text>
          <Text style={styles.tableCell}>Total</Text>
        </View>

        {/* Table Body */}
        {invoiceData.products.map((product, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{product.name}</Text>
            <Text style={styles.tableCell}>{product.quantity}</Text>
            <Text style={styles.tableCell}>
              {product.price.toLocaleString()} Rs
            </Text>
            <Text style={styles.tableCell}>
              {(product.quantity * product.price).toLocaleString()} Rs
            </Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>
          Delivery Charge: {invoiceData.deliveryCharge==="Free"?"Free":`${invoiceData.deliveryCharge} Rs`}
        </Text>
        <Text style={styles.text}>
          Total Amount: {invoiceData.total.toLocaleString()} Rs
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
        <Text>For any inquiries, please contact {companyDetails.email}</Text>
      </View>
    </Page>
  </Document>
);

// Component with download button
const InvoicePDF = ({ invoiceData }) => (
  <PDFDownloadLink
    document={<InvoiceDocument invoiceData={invoiceData} />}
    fileName={`invoice_${invoiceData.invoiceNo}.pdf`}
    className="primary-btn !px-3 !py-2 hover:!translate-y-0"
  >
    {({ blob, url, loading, error }) =>
      loading ? "Generating Invoice..." : "Download Invoice"
    }
  </PDFDownloadLink>
);

export default InvoicePDF;
