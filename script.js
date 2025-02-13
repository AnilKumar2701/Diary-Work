// Auto-fill day based on date
document.addEventListener('DOMContentLoaded', () => {
  const dateField = document.getElementById('date');
  const dayField = document.getElementById('day');
  
  const today = new Date();
  dateField.value = today.toISOString().split('T')[0];
  dayField.value = getDayName(today);

  dateField.addEventListener('change', () => {
    dayField.value = getDayName(new Date(dateField.value));
  });
});

function getDayName(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
}

// Update subjects based on selected class
function updateSubjects() {
  const classSelected = document.getElementById("classSelect").value;
  const subjectsTable = document.querySelector("tbody");
  subjectsTable.innerHTML = "";

  const subjects = {
    "1": ["Telugu", "Hindi", "English", "Maths"],
    "6": ["Telugu", "Hindi", "English", "Maths", "Science", "Social"],
    "10": ["Telugu", "Hindi", "English", "Maths", "Physics", "Biology", "Social"]
  }[classSelected] || [];

  subjects.forEach(subject => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${subject}</td><td><input type="text" placeholder="Enter message"></td>`;
    subjectsTable.appendChild(row);
  });
}

// Print the page
function printPage() {
  window.print();
}

// Share on WhatsApp
function shareOnWhatsApp() {
  const mobile = document.getElementById('mobileNumber').value;
  if (!mobile) {
    alert("Enter a mobile number to share on WhatsApp.");
    return;
  }

  let message = `Diary Work:\nTeacher: ${document.getElementById('teacherName').value}\nDate: ${document.getElementById('date').value}\n`;
  document.querySelectorAll('tbody tr').forEach(row => {
    message += `${row.cells[0].textContent}: ${row.cells[1].querySelector('input').value}\n`;
  });

  window.open(`https://wa.me/${mobile}?text=${encodeURIComponent(message)}`, '_blank');
}

// Clear all inputs
function clearAll() {
  document.querySelectorAll("input").forEach(input => input.value = "");
}
