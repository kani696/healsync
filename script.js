function showSection(section){
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.style.display='none');
  document.getElementById(section).style.display='block';
}

// Simulate patients and alerts
const patients = [];
for(let i=1;i<=8;i++){
  patients.push({name:`Patient ${i}`, pulse:60+Math.floor(Math.random()*40), bp:100+Math.floor(Math.random()*30), oxygen:90+Math.floor(Math.random()*10)});
}

function loadPatientDashboard(){
  const container = document.getElementById('patientsContainer');
  container.innerHTML = '';
  patients.forEach(p=>{
    const card = document.createElement('div');
    card.className='patient-card '+(p.pulse>100||p.bp>130||p.oxygen<95?'alert':'healthy');
    card.innerHTML = `<h4>${p.name}</h4>
                      Pulse: ${p.pulse} ❤️<br>
                      BP: ${p.bp} 🩺<br>
                      Oxygen: ${p.oxygen} 💨<br>
                      <canvas id="chart${p.name.replace(' ','')}" width="200" height="100"></canvas>`;
    container.appendChild(card);

    // Chart
    const ctx = document.getElementById(`chart${p.name.replace(' ','')}`).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1s','2s','3s','4s','5s','6s'],
        datasets: [
          { label: 'Pulse', data: Array.from({length:6},()=>p.pulse+Math.floor(Math.random()*5)), borderColor:'red', fill:false },
          { label: 'BP', data: Array.from({length:6},()=>p.bp+Math.floor(Math.random()*5)), borderColor:'blue', fill:false },
          { label: 'Oxygen', data: Array.from({length:6},()=>p.oxygen+Math.floor(Math.random()*2)), borderColor:'green', fill:false }
        ]
      }
    });
  });
}

// Load alerts dynamically
function loadAlerts(){
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML='';
  patients.forEach(p=>{
    if(p.pulse>100||p.bp>130||p.oxygen<95){
      const alertDiv = document.createElement('div');
      alertDiv.className='alert';
      alertDiv.innerText=`🚨 ${p.name} has abnormal readings!`;
      alertContainer.appendChild(alertDiv);
    }
  });
}

// Call periodically to simulate continuous monitoring
setInterval(()=>{
  patients.forEach(p=>{
    p.pulse = 60+Math.floor(Math.random()*50);
    p.bp = 100+Math.floor(Math.random()*40);
    p.oxygen = 90+Math.floor(Math.random()*10);
  });
  loadPatientDashboard();
  loadAlerts();
},5000);

// Initial load
loadPatientDashboard();
loadAlerts();
