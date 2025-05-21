import React from 'react';

const PdfDownloadButton = () => {
    const handleDownload = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/download-pdf', {
          method: 'GET',
        });
        if (!response.ok) throw new Error('Failed to download PDF');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Raw-Material-Details.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    };
  
    return (
      <button onClick={handleDownload} className="btn btn-outline-success px-4 py-2 rounded ">
        Download PDF
      </button>
    );
  };
  
  export default PdfDownloadButton;
  