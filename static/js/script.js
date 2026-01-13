// Password generation function (fixed exact length)
function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
    let password = [];
    let charTypes = [];

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    if (useUpper) charTypes.push(uppercase);
    if (useLower) charTypes.push(lowercase);
    if (useNumbers) charTypes.push(digits);
    if (useSymbols) charTypes.push(symbols);

    // Ensure at least one character from each selected type
    charTypes.forEach(type => {
        password.push(type[Math.floor(Math.random() * type.length)]);
    });

    // Fill remaining length
    const allChars = charTypes.join('');
    while (password.length < length) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];
        password.push(char);
    }

    // Shuffle password
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}

// Calculate password strength
function getStrength(length, typesCount) {
    if (length < 6 || typesCount === 1) return {text: 'Weak', class: 'weak'};
    if (length < 10 || typesCount === 2) return {text: 'Medium', class: 'medium'};
    if (length < 14 || typesCount === 3) return {text: 'Strong', class: 'strong'};
    return {text: 'Very Strong', class: 'very-strong'};
}

// DOM elements
const form = document.getElementById('passwordForm');
const resultDiv = document.getElementById('result');
const passwordField = document.getElementById('passwordField');
const copyBtn = document.getElementById('copyBtn');
const strengthText = document.getElementById('strengthText');

form.addEventListener('submit', e => {
    e.preventDefault();
    const length = parseInt(document.getElementById('length').value);
    const useUpper = document.getElementById('uppercase').checked;
    const useLower = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    const selectedTypes = [useUpper, useLower, useNumbers, useSymbols].filter(v => v).length;

    if (selectedTypes === 0) {
        alert('Select at least one character type!');
        return;
    }

    const password = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
    passwordField.value = password;

    // Show strength
    const strength = getStrength(length, selectedTypes);
    strengthText.innerText = strength.text;
    strengthText.className = strength.class;

    resultDiv.style.display = 'block';
});

// Copy password
copyBtn.addEventListener('click', () => {
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(passwordField.value);
    copyBtn.innerText = 'Copied!';
    setTimeout(() => { copyBtn.innerText = 'Copy'; }, 1500);
});
