
  // Function to load external HTML into a container
  function includeHTML(url, containerId) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById(containerId).innerHTML = data;
      })
      .catch(error => {
        console.error('Error loading HTML:', error);
      });
  }

  // Usage
  includeHTML('form elements/signature section.html', 'include-container');

