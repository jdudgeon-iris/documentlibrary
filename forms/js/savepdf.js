
  async function saveAsPDF() {
    const { jsPDF } = window.jspdf;
    const form = document.getElementById('form-container');

    // Capture the form as an image
    const canvas = await html2canvas(form, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('signature-form.pdf');
  }
