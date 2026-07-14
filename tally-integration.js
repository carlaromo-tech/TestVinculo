const TALLY_FORM_ID = 'yPREXB';
const TALLY_SCRIPT_URL = 'https://tally.so/widgets/embed.js';

function getTestResultData() {
  const total = answers.reduce(function(sum, value) {
    return sum + (value || 0);
  }, 0);

  let result = 'Conexión activa';
  if (total > 18 && total <= 30) {
    result = 'Modo Supervisor activado';
  } else if (total > 30) {
    result = 'Comunicación interrumpida';