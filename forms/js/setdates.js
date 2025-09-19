document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split('T')[0];
  const fields = ['date', 
    'client1Signed', 
    'client2Signed', 
    'staffSigned', 
    'client1ChecklistSignedDate', 
    'client2ChecklistSignedDate', 
    'staffChecklistSignedDate', 
    'client1GoalSignedDate',
    'client2GoalSignedDate',
    'client1ReleasesSignedDate',
    'client2ReleasesSignedDate',
    'client1RightsSignedDate',
    'client2RightsSignedDate',
    'client1TransportSignedDate',
    'client2TransportSignedDate',
    'client1ServiceSignedDate',
    'client2ServiceSignedDate',
    'staffServiceSignedDate',
    'staffRightsSignedDate',
    'staffTransportSignedDate',
    'staffGoalSignedDate',
    'staffReleasesSignedDate',
    'client1CommunicationSignedDate',
    'client2CommunicationSignedDate',
    'staffCommunicationSignedDate',
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




