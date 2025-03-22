
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Bill, BillItem } from "../types/bill";

export const generateBillPDF = (bill: Bill): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text("HOTEL BITTO", 105, 20, { align: "center" });
  
  // Add address
  doc.setFontSize(10);
  doc.text("Annabhau Sathe, Near Kalash Lawns, Kopargaon, Pincode 423603", 105, 30, { align: "center" });
  
  // Add bill details
  doc.setFontSize(12);
  doc.text(`Bill Number: ${bill.id}`, 14, 45);
  doc.text(`Date: ${new Date(bill.date).toLocaleString()}`, 14, 52);
  doc.text(`Customer: ${bill.customerName}`, 14, 59);
  doc.text(`Table: ${bill.tableNumber}`, 14, 66);
  
  // Add items table
  const tableColumn = ["Item", "Price", "Quantity", "Total"];
  const tableRows: string[][] = [];
  
  bill.items.forEach((item) => {
    const itemData = [
      item.name,
      `₹${item.price}`,
      item.quantity.toString(),
      `₹${item.price * item.quantity}`
    ];
    tableRows.push(itemData);
  });
  
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 75,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [66, 133, 244], textColor: 255 }
  });
  
  // Add totals
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.text(`Subtotal: ₹${bill.subtotal}`, 130, finalY);
  doc.text(`GST (5%): ₹${bill.tax}`, 130, finalY + 7);
  doc.text(`Total: ₹${bill.total}`, 130, finalY + 14);
  
  // Add footer
  doc.setFontSize(10);
  doc.text("Thank you for dining with us!", 105, finalY + 30, { align: "center" });
  
  // Save the PDF
  doc.save(`HOTEL_BITTO_BILL_${bill.id}.pdf`);
};
