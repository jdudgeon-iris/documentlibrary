async function saveAsPDF() {
  const { jsPDF } = window.jspdf;
  const form = document.getElementById('form-container');

  // Capture the form as an image
  const canvas = await html2canvas(form, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Define PDF dimensions in points (1 inch = 72 points)
  const pdfWidth = 612; // 8.5 inches
  const pdfHeight = 792; // 11 inches

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter' // 8.5 x 11 inches
  });

  let position = 0;

  // Add pages if content overflows
  while (position < imgHeight) {
    pdf.addImage(
      imgData,
      'PNG',
      0,
      -position,
      imgWidth,
      imgHeight
    );

    position += pdfHeight;

    if (position < imgHeight) {
      pdf.addPage();
    }
  }

  pdf.save('Consent to Photograph.pdf');
}
