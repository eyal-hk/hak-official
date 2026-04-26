/* HK Money AI – form handlers */
(function () {
  var WEBHOOK = 'https://services.leadconnectorhq.com/hooks/xb3rZ5Z4gIQCgKJUAPAe/webhook-trigger/59e35304-8c8d-4fe5-85ff-43d63f3e36ee';

  ['lead-form', 'mn-form'].forEach(function (id) {
    var form = document.getElementById(id);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'שולח...';
      btn.disabled = true;

      var inputs = form.querySelectorAll('input');
      var fullName = inputs[0] ? inputs[0].value.trim() : '';
      var nameParts = fullName.split(' ');
      var payload = {
        firstName:    nameParts[0] || '',
        lastName:     nameParts.slice(1).join(' ') || '',
        full_name:    fullName,
        phone:        inputs[1] ? inputs[1].value : '',
        email:        inputs[2] ? inputs[2].value : '',
        business_name: inputs[3] ? inputs[3].value : '',
        source:       'HK Money AI Landing Page',
        form_id:      'website',
        tags:         ['hk-money-ai', 'landing-page']
      };

      fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function () {
          btn.textContent = '✅ קיבלנו! נחזור אליך תוך 24 שעות';
          btn.style.background = '#16a34a';
          form.querySelectorAll('input').forEach(function (inp) { inp.value = ''; });
        })
        .catch(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          alert('שגיאה בשליחה — אנא נסו שוב או צרו קשר ישירות.');
        });
    });
  });
})();
