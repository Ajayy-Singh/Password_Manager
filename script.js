document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('password-form');
    const passwordTableBody = document.getElementById('password-table-body');
    const noDataMessage = document.getElementById('no-data-message');
    
    const generateBtn = document.getElementById('generate-btn');
    const copyGeneratedBtn = document.getElementById('copy-generated-btn');
    const generatedPasswordField = document.getElementById('generated-password');
    const passwordLengthSlider = document.getElementById('password-length');
    const lengthValueSpan = document.getElementById('length-value');

    const showNotification = (id, duration = 2000) => {
        const notification = document.getElementById(id);
        if (notification) {
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, duration);
        }
    };

    const copyText = (text, type = 'entry') => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('alert-copy');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const showPasswords = () => {
        const passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
        passwordTableBody.innerHTML = '';

        if (passwords.length === 0) {
            noDataMessage.classList.remove('hidden');
        } else {
            noDataMessage.classList.add('hidden');
            passwords.forEach(p => {
                const tr = document.createElement('tr');
                tr.className = 'bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50';

                const maskedPassword = '*'.repeat(p.password.length);

                tr.innerHTML = `
                    <td class="px-6 py-4 font-medium whitespace-nowrap">${p.website}</td>
                    <td class="px-6 py-4">${p.username}</td>
                    <td class="px-6 py-4">${maskedPassword}</td>
                    <td class="px-6 py-4 text-center">
                        <button class="action-btn copy-btn" data-password="${p.password}">Copy</button>
                        <button class="action-btn delete-btn" data-website="${p.website}">Delete</button>
                    </td>
                `;
                passwordTableBody.appendChild(tr);
            });
        }
    };

    passwordTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const website = e.target.dataset.website;
            let passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
            passwords = passwords.filter(p => p.website !== website);
            localStorage.setItem('passwords', JSON.stringify(passwords));
            showPasswords();
            showNotification('alert-delete');
        }
        if (e.target.classList.contains('copy-btn')) {
            const password = e.target.dataset.password;
            copyText(password);
        }
    });

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const website = document.getElementById('website').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (website && username && password) {
            const passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
            passwords.push({ website, username, password });
            localStorage.setItem('passwords', JSON.stringify(passwords));
            showNotification('alert-added');
            passwordForm.reset();
            showPasswords();
        }
    });

    const generatePassword = (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    };

    generateBtn.addEventListener('click', () => {
        const length = passwordLengthSlider.value;
        const newPassword = generatePassword(length);
        generatedPasswordField.value = newPassword;
    });
    
    copyGeneratedBtn.addEventListener('click', () => {
        copyText(generatedPasswordField.value, 'generated');
    });

    passwordLengthSlider.addEventListener('input', (e) => {
        lengthValueSpan.textContent = e.target.value;
    });

    showPasswords();
});