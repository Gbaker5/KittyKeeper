document.addEventListener('DOMContentLoaded', function () {
  var cb = document.getElementById('hasOtherPets');
  var wrap = document.getElementById('otherPetsWrap');
  if (!cb || !wrap) return;

  // ensure the initial visibility matches the checkbox
  wrap.style.display = cb.checked ? 'block' : 'none';

  cb.addEventListener('change', function () {
    wrap.style.display = cb.checked ? 'block' : 'none';
  });
});