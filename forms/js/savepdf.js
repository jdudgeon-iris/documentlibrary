
  async function saveAsPDF() {
    const jsPDF = window.jspdf?.jsPDF || window.jspdf?.jsPDF;
    const form = document.getElementById('form-container');

    if (!jsPDF || !form) {
      alert('Required libraries or form element not found.');
      return;
    }

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
      const canvas = await html2canvas(form, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;

      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

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

      const today = new Date().toISOString().split('T')[0];
      pdf.save(`Consent_to_Photograph_${today}.pdf`);
    } catch (error) {
      alert('An error occurred while generating the PDF. Check the console for details.');
      console.error(error);
    } finally {
      document.body.removeChild(loading);
    }
  }

