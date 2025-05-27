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
