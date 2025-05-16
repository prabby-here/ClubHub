const PDFDocument = require("pdfkit");

module.exports = async (student, event) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Simple certificate layout
    doc.fontSize(24).text("Certificate of Participation", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`This is to certify that`);
    doc
      .fontSize(20)
      .text(`${student.name} (${student.usn})`, { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`has participated in the event "${event.name}"`);
    doc.moveDown();
    doc.text(`Date: ${event.date.toDateString()}`);
    doc.end();
  });
};
