function openModal(type) {
    document.getElementById('overlay').classList.add('active');
    if (type === 'continue') {
      document.getElementById('continueModal').classList.add('active');
    } else {
      document.getElementById('aboutModal').classList.add('active');
    }
  }
  
  function closeModal() {
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('continueModal').classList.remove('active');
    document.getElementById('aboutModal').classList.remove('active');
  }

function  loginfunction() {
    window.location.href = "./login page/intex.html";
}