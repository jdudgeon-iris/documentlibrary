document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split('T')[0];
  const fields = ['date', 
    'client1Signed', 
    'client2Signed', 
    'staffSigned', 
    'client1ChecklistSignedDate', 
    'client2ChecklistSignedDate', 
    'staffChecklistSignedDate', 
    'client1DateSignedConsentService', 
    'client2DateSignedConsentService', 
    'staffDateSignedConsentService', 
    'client1SignedRights', 
    'client2SignedRights', 
    'staffSignedRights', 
    'client1Transport', 
    'client2Transport', 
    'staffTransport', 
    'client1Communicate', 
    'client2Communicate', 
    'staffCommunicate',
    'client1ReleaseInfo', 
    'client2ReleaseInfo', 
    'staffReleaseInfo',
    'client1TreatmentPlanDate', 
    'client2TreatmentPlanDate', 
    'staffTreatmentPlanDate'
  ];

  fields.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.value = today;
    }
  });
});




function setExpiresOnLabel() {
  const label = document.getElementById('ExpiresOn');
  if (label) {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const formattedDate = nextYear.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    label.textContent = formattedDate;
  }
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", setExpiresOnLabel);




