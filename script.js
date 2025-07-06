// File: script.js
        document.addEventListener('DOMContentLoaded', () => {
            
            // --- EFEITO INTERATIVO 1: NAVEGAÇÃO MOBILE (MENU HAMBÚRGUER) ---
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');

            menuToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
            });
            
            // Fecha o menu ao clicar em um link
            const navLinks = document.querySelectorAll('.main-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                    }
                });
            });

            // --- EFEITO INTERATIVO 2: ANIMAÇÃO DE FADE-IN AO ROLAR ---
            const sections = document.querySelectorAll('.fade-in-section');
            
            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // Se a seção está na tela (intersecting)
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Para de observar depois de animar
                    }
                });
            }, {
                root: null, // Observa em relação ao viewport
                threshold: 0.15 // Aciona quando 15% da seção estiver visível
            });

            sections.forEach(section => {
                sectionObserver.observe(section);
            });

            // --- VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
            const contactForm = document.getElementById('contactForm');

            contactForm.addEventListener('submit', function(event) {
                // Impede o envio padrão do formulário
                event.preventDefault();

                let isValid = true;

                // Seleciona os campos e mensagens de erro
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                
                const nameError = document.getElementById('nameError');
                const emailError = document.getElementById('emailError');
                const messageError = document.getElementById('messageError');

                // Função para mostrar/esconder erro
                const toggleError = (field, errorElement, condition) => {
                    if (condition) {
                        errorElement.style.display = 'block';
                        field.style.borderColor = '#e74c3c';
                        return false;
                    } else {
                        errorElement.style.display = 'none';
                        field.style.borderColor = '#ccc';
                        return true;
                    }
                };
                
                // Validações
                const isNameValid = toggleError(name, nameError, name.value.trim() === '');
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isEmailValid = toggleError(email, emailError, !emailPattern.test(email.value));
                const isMessageValid = toggleError(message, messageError, message.value.trim() === '');
                
                isValid = isNameValid && isEmailValid && isMessageValid;

                // Se tudo estiver válido, envia o formulário
                if (isValid) {
                    alert('Formulário enviado com sucesso!\n\nNome: ' + name.value + '\nEmail: ' + email.value);
                    contactForm.reset();
                    // Reseta as bordas dos campos para o padrão
                    [name, email, message].forEach(field => field.style.borderColor = '#ccc');
                }
            });
        });
  