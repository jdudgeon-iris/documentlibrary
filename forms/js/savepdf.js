async function saveAsPDF() {
  const jsPDF = window.jspdf?.jsPDF;
  const sections = document.querySelectorAll('.pdf-section');

  if (!jsPDF || sections.length === 0) {
    alert('Required libraries or sections not found.');
    return;
  }

  const loading = document.createElement('div');
  loading.innerText = 'Generating PDF... Please wait.';
  Object.assign(loading.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    zIndex: '9999'
  });
  document.body.appendChild(loading);

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    const pageWidth = 612;
    const pageHeight = 792;
    const margin = 20;
    const imgWidth = pageWidth - margin * 2;

    for (let i = 0; i < sections.length; i++) {
      const canvas = await html2canvas(sections[i], { scale: 2 });
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
    }


  const today = new Date().toISOString().split('T')[0];
  const title = document.title.replace(/[\\/:*?"<>|]/g, ''); // sanitize for file systems
  pdf.save(`${title}_${today}.pdf`);

  } catch (error) {
    alert('An error occurred while generating the PDF. Check the console for details.');
    console.error(error);
  } finally {
    document.body.removeChild(loading);
  }
}
