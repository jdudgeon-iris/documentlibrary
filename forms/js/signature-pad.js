document.querySelectorAll('.signature-pad').forEach((canvas, index) => {
    const ctx = canvas.getContext('2d');
    let drawing = false;

    function getMousePos(evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) * (canvas.width / rect.width),
            y: (evt.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        const pos = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        const pos = getMousePos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    });

    canvas.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('mouseout', () => drawing = false);

    // Optional: Add clear button logic per pad if needed
    canvas.clear = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    };

    // Store context and canvas for later use
    canvas.ctx = ctx;
});

// Save all signatures
function saveAllSignatures() {
    const canvases = document.querySelectorAll('.signature-pad');
    const inputs = document.querySelectorAll('.signature-input');

    canvases.forEach((canvas, i) => {
        const dataURL = canvas.toDataURL();
        inputs[i].value = dataURL;
    });

    document.getElementById('signature-form').submit();
}
