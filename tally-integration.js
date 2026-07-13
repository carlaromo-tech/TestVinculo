const TALLY_FORM_ID = 'yPREXB';

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

function requestLead() {
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
