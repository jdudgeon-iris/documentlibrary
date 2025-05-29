
function includeHTML(url, containerId, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(containerId).innerHTML = data;

      // Call the callback function after HTML is injected
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => {
      console.error('Error loading HTML:', error);
    });
}


includeHTML('form elements/signature section.html', 'include-container', () => {
  initializeSignaturePads(); // Re-initialize signature pads
  setupFormSubmission();     // Re-bind form submission if needed
});


