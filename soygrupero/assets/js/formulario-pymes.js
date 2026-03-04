(function () {
    var fields = ['nombre', 'correo', 'empresa', 'telefono', 'presupuesto', 'objetivo', 'comentarios'];

    var form = document.querySelector('.formPymes');
    if (!form) return;

    fields.forEach(function (id) {
        var input = document.getElementById(id);
        if (!input) return;
        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                input.classList.remove('input-error');
                var errorSpan = document.getElementById('error-' + id);
                if (errorSpan) errorSpan.style.display = 'none';
            }
        });
    });

    form.addEventListener('submit', function (e) {
        var isValid = true;

        fields.forEach(function (id) {
            var input = document.getElementById(id);
            var errorSpan = document.getElementById('error-' + id);
            if (!input) return;

            if (input.value.trim() === '') {
                e.preventDefault();
                isValid = false;
                input.classList.add('input-error');
                if (errorSpan) errorSpan.style.display = 'block';
            } else {
                input.classList.remove('input-error');
                if (errorSpan) errorSpan.style.display = 'none';
            }
        });
    });
})();