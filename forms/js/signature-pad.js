document.querySelectorAll('.signature-pad').forEach((canvas, index) => {
    const ctx = canvas.getContext('2d');
    let drawing = false;

    function getPos(evt) {
        const rect = canvas.getBoundingClientRect();
        let x, y;

        if (evt.touches) {
            x = (evt.touches[0].clientX - rect.left) * (canvas.width / rect.width);
            y = (evt.touches[0].clientY - rect.top) * (canvas.height / rect.height);
        } else {
            x = (evt.clientX - rect.left) * (canvas.width / rect.width);
            y = (evt.clientY - rect.top) * (canvas.height / rect.height);
        }

        return { x, y };
    }

    function startDrawing(e) {
        drawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        e.preventDefault();
    }

    function draw(e) {
        if (!drawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        e.preventDefault();
    }

    function stopDrawing(e) {
        drawing = false;
        e.preventDefault();
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    // Optional: Clear function
    canvas.clear = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    };

    canvas.ctx = ctx;
});



function saveSignatureToImage(who) {
  const canvas = document.getElementById(`${who}signature-pad`);
  const img = document.getElementById(`${who}signature-image`);
  const modalElement = document.getElementById(`${who}signatureModal`);
  const button = document.getElementById(`${who}signbutton`);

  if (canvas && img) {
    const dataURL = canvas.toDataURL('image/png');
    img.src = dataURL;
    img.style.display = 'block';
  }

  const modal = bootstrap.Modal.getInstance(modalElement);
  if (modal) modal.hide();

  // Hide the button
  if (button) button.style.display = 'none';
}




function clearSignatureImage(imageId) {
  const img = document.getElementById(imageId);
  if (img) {
    img.src = '';
    img.style.display = 'none';
  }

  // Reconstruct the button ID from the image ID
  const who = imageId.replace('signature-image', '');
  const button = document.getElementById(`${who}signbutton`);
  if (button) {
    button.style.display = 'inline-block'; // or 'block' depending on layout
  }
}


function clearSignature(padId) {
 const canvas = document.getElementById(padId);
 if (canvas && canvas.clear) {
 canvas.clear(); // clear the canvas
 }

 // Derive the base ID (e.g., 'client2') from the padId
 const who = padId.replace('signature-pad', '');
 clearSignatureImage(`${who}signature-image`);
}


