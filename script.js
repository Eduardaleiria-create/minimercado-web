// Atualizar relógio em tempo real
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR');
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock(); // Inicializar imediatamente

document.addEventListener('DOMContentLoaded', function() {
    // Configurar data mínima para agendamento (a partir de hoje)
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = `${yyyy}-${mm}-${dd}`;
    const dataAgendamentoEl = document.getElementById('dataAgendamento');
    if (dataAgendamentoEl) dataAgendamentoEl.min = formattedToday;

    // Validação do formulário de cadastro
    const form = document.getElementById('customerForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!form.checkValidity()) {
                event.stopPropagation();
            } else {
                alert('Cadastro realizado com sucesso! Em breve você receberá um e-mail de confirmação.');
                form.reset();
                form.classList.remove('was-validated');
            }
            form.classList.add('was-validated');
        });
    }

    // Confirmar agendamento
    const confirmarAgendamentoEl = document.getElementById('confirmarAgendamento');
    if (confirmarAgendamentoEl) {
        confirmarAgendamentoEl.addEventListener('click', function() {
            const tipoServico = document.getElementById('tipoServico').value;
            const data = document.getElementById('dataAgendamento').value;
            const hora = document.getElementById('horaAgendamento').value;

            if (!tipoServico || !data || !hora) {
                alert('Por favor, preencha todos os campos obrigatórios do agendamento.');
                return;
            }

            // Formatar data para exibição
            const dataObj = new Date(data + 'T' + hora);
            const dataFormatada = dataObj.toLocaleDateString('pt-BR');
            const horaFormatada = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            alert(`Agendamento confirmado!\nServiço: ${tipoServico === 'entrega' ? 'Tele-entrega' : 'Retirada no Local'}\nData: ${dataFormatada}\nHorário: ${horaFormatada}`);

            // Fechar o modal
            const agendamentoModal = document.getElementById('agendamentoModal');
            if (agendamentoModal && bootstrap?.Modal) {
                const modal = bootstrap.Modal.getInstance(agendamentoModal);
                if (modal) modal.hide();
            }

            // Limpar formulário
            const agendamentoForm = document.getElementById('agendamentoForm');
            if (agendamentoForm) agendamentoForm.reset();
        });
    }

    // Funcionalidades de acessibilidade
    const contrastBtn = document.getElementById('contrast-btn');
    if (contrastBtn) {
        contrastBtn.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            document.querySelectorAll('.card, .navbar, footer').forEach(el => {
                el.classList.toggle('high-contrast');
            });
            document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li').forEach(el => {
                el.classList.toggle('high-contrast-text');
            });
            document.querySelectorAll('.card, .form-control, .btn').forEach(el => {
                el.classList.toggle('high-contrast-border');
            });
        });
    }

    const fontIncrease = document.getElementById('font-increase');
    if (fontIncrease) {
        fontIncrease.addEventListener('click', function() {
            const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
            document.body.style.fontSize = (currentSize + 1) + 'px';
        });
    }

    const fontDecrease = document.getElementById('font-decrease');
    if (fontDecrease) {
        fontDecrease.addEventListener('click', function() {
            const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
            if (currentSize > 12) {
                document.body.style.fontSize = (currentSize - 1) + 'px';
            }
        });
    }

    // Máscaras para formulário
    const cpfEl = document.getElementById('cpf');
    if (cpfEl) {
        cpfEl.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 9) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/(\d{3})(\d+)/, '$1.$2');
            }

            e.target.value = value;
        });
    }

    const telefoneEl = document.getElementById('telefone');
    if (telefoneEl) {
        telefoneEl.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d+)/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/(\d+)/, '($1');
            }

            e.target.value = value;
        });
    }
});
