import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generatePDF = (report) => {
  return new Promise((resolve, reject) => {

    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const fileName = `report-${report._id}.pdf`;
    const filePath = path.join(uploadDir, fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text("Medical Report", { align: "center" });

    doc.moveDown();
    doc.text(`Doctor: ${report.doctorName}`);
    doc.text(`Patient: ${report.patientName}`);

    doc.moveDown();
    doc.text("Diagnosis:");
    doc.text(report.diagnosis);

    doc.moveDown();
    doc.text("Prescription:");
    doc.text(report.prescription);

    doc.moveDown();
    doc.text("Notes:");
    doc.text(report.notes);

    doc.end();

    // ✅ WAIT UNTIL FILE IS WRITTEN
    stream.on("finish", () => {
      resolve(`uploads/${fileName}`);
    });

    stream.on("error", reject);
  });
};