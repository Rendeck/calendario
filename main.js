const form = document.getElementById('appointment-form');
const appointmentsList = document.getElementById('appointments-list');

// Tu número de WhatsApp (con 52 y sin espacios)
const adminPhone = '526564616865';

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const reason = document.getElementById('reason').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  // Registrar en la tabla
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${phone}</td>
    <td>${reason}</td>
    <td>${date}</td>
    <td>${time}</td>
    <td><button class="whatsapp-btn" onclick="sendWhatsApp('${phone}', '${name}', '${reason}', '${date}', '${time}')">Enviar WhatsApp</button></td>
  `;
  appointmentsList.appendChild(row);

  // Notificar al administrador por WhatsApp
  sendToAdmin(name, phone, reason, date, time);

  form.reset();
});

function sendWhatsApp(phone, name, reason, date, time) {
  const message = `Hola ${name}, tu cita ha sido agendada:\n📅 Fecha: ${date}\n⏰ Hora: ${time}\n📝 Motivo: ${reason}\n\n¡Gracias por confiar en nosotros!`;
  const url = `https://api.whatsapp.com/send?phone=52${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function sendToAdmin(name, phone, reason, date, time) {
  const adminMessage = `🚨 NUEVA CITA AGENDADA 🚨\n\n👤 Paciente: ${name}\n📞 Teléfono: ${phone}\n📝 Motivo: ${reason}\n📅 Fecha: ${date}\n⏰ Hora: ${time}`;
  const adminURL = `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(adminMessage)}`;
  window.open(adminURL, '_blank');
}