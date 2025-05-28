<script>
  async function saveAsPDF() {
    const { jsPDF } = window.jspdf;
    const form = document.getElementById('form-container');

    // Show loading indicator
    const loading = document.createElement('div');
    loading.innerText = 'Generating PDF... Please wait.';
    loading.style.position = 'fixed';
    loading.style.top = '20px';
    loading.style.left = '50%';
    loading.style.transform = 'translateX(-50%)';
    loading.style.backgroundColor = '#333';
    loading.style.color = '#fff';
    loading.style.padding = '10px 20px';
    loading.style.borderRadius = '5px';
    loading.style.zIndex = '9999';
    document.body.appendChild(loading);

    try {
      // Capture the form as an image
      const canvas = await html2canvas(form, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      // PDF setup
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter' // 8.5 x 11 inches
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;

      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

      // Add pages if content overflows
      while (position < imgHeight) {
        pdf.addImage(
          imgData,
          'PNG',
          margin,
          -position + margin,
          imgWidth,
          imgHeight
        );

        position += pdfHeight - margin * 2;

        if (position < imgHeight) {
          pdf.addPage();
        }
      }

      // Generate filename with today's date
      const today = new Date().toISOString().split('T')[0];
      pdf.save(`Consent_to_Photograph_${today}.pdf`);
    } catch (error) {
      alert('An error occurred while generating the PDF. Please try again.');
      console.error(error);
    } finally {
      // Remove loading indicator
      document.body.removeChild(loading);
    }
  }
</script>
