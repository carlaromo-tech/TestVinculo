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
  }

  return {
    puntaje: String(total),
    resultado: result,
    respuestas: answers.join('-'),
    origen: 'test-vinculo-nido'
  };
}

function openTallyForm() {
  const data = getTestResultData();

  if (!window.Tally || typeof window.Tally.openPopup !== 'function') {
    window.location.href = 'https://tally.so/r/' + TALLY_FORM_ID +
      '?puntaje=' + encodeURIComponent(data.puntaje) +
      '&resultado=' + encodeURIComponent(data.resultado) +
      '&respuestas=' + encodeURIComponent(data.respuestas) +
      '&origen=' + encodeURIComponent(data.origen);
    return;
  }

  window.Tally.openPopup(TALLY_FORM_ID, {
    layout: 'modal',
    width: 520,
    hiddenFields: data,
    onSubmit: function() {
      window.Tally.closePopup(TALLY_FORM_ID);
      showResult();
    }
  });
}

function requestLead() {
  if (window.Tally && typeof window.Tally.openPopup === 'function') {
    openTallyForm();
    return;
  }

  const existingScript = document.querySelector('script[src="' + TALLY_SCRIPT_URL + '"]');
  if (existingScript) {
    existingScript.addEventListener('load', openTallyForm, { once: true });
    setTimeout(function() {
      if (!window.Tally) openTallyForm();
    }, 2500);
    return;
  }

  const script = document.createElement('script');
  script.src = TALLY_SCRIPT_URL;
  script.async = true;
  script.onload = openTallyForm;
  script.onerror = openTallyForm;
  document.head.appendChild(script);
}
