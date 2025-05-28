document.addEventListener("DOMContentLoaded", function () {
const today = new Date().toISOString().split('T')[0];
const fields = ['date', 'client1Signed', 'client2Signed', 'staffSigned'];

fields.forEach(id => {
const element = document.getElementById(id);
if (element) {
element.value = today;
}
});
});
