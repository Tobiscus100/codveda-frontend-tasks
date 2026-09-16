document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const meterFill = document.getElementById('meter-fill');
  const strengthText = document.getElementById('strength-text');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  // Regex rules
  const REGEX = {
    name: /^[a-zA-Z\s]{3,40}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[0-9\s-]{10,15}$/
  };

  // State tracker
  const fieldStatus = {
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false
  };

  // Helper: Apply UI validation states
  const setFieldState = (input, groupKey, isValid, message = '') => {
    const group = document.getElementById(`group-${groupKey}`);
    const errorEl = document.getElementById(`error-${groupKey}`);

    if (isValid) {
      group.classList.remove('invalid');
      group.classList.add('valid');
      errorEl.textContent = '';
      fieldStatus[groupKey] = true;
    } else {
      group.classList.remove('valid');
      group.classList.add('invalid');
      errorEl.textContent = message;
      fieldStatus[groupKey] = false;
    }
  };

  // 1. Full Name Validation
  const validateName = () => {
    const value = nameInput.value.trim();
    if (!value) {
      setFieldState(nameInput, 'name', false, 'Full name is required.');
    } else if (!REGEX.name.test(value)) {
      setFieldState(nameInput, 'name', false, 'Letters and spaces only (minimum 3 characters).');
    } else {
      setFieldState(nameInput, 'name', true);
    }
  };

  // 2. Email Validation
  const validateEmail = () => {
    const value = emailInput.value.trim();
    if (!value) {
      setFieldState(emailInput, 'email', false, 'Email address is required.');
    } else if (!REGEX.email.test(value)) {
      setFieldState(emailInput, 'email', false, 'Please provide a valid email (e.g. user@domain.com).');
    } else {
      setFieldState(emailInput, 'email', true);
    }
  };

  // 3. Phone Validation
  const validatePhone = () => {
    const value = phoneInput.value.trim();
    if (!value) {
      setFieldState(phoneInput, 'phone', false, 'Phone number is required.');
    } else if (!REGEX.phone.test(value)) {
      setFieldState(phoneInput, 'phone', false, 'Enter a valid international phone format (10-15 digits).');
    } else {
      setFieldState(phoneInput, 'phone', true);
    }
  };

  // 4. Password Strength Evaluation
  const evaluatePassword = () => {
    const value = passwordInput.value;
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    // Update Strength Bar & Label
    const levels = [
      { text: 'None', color: 'transparent', width: '0%' },
      { text: 'Weak', color: '#EF4444', width: '25%' },
      { text: 'Fair', color: '#F59E0B', width: '50%' },
      { text: 'Good', color: '#3B82F6', width: '75%' },
      { text: 'Strong', color: '#10B981', width: '100%' }
    ];

    const currentLevel = value.length === 0 ? levels[0] : levels[score];
    meterFill.style.width = currentLevel.width;
    meterFill.style.backgroundColor = currentLevel.color;
    strengthText.textContent = `Strength: ${currentLevel.text}`;
    strengthText.style.color = currentLevel.color || '#6B7280';

    if (!value) {
      setFieldState(passwordInput, 'password', false, 'Password is required.');
    } else if (value.length < 8) {
      setFieldState(passwordInput, 'password', false, 'Password must be at least 8 characters.');
    } else {
      setFieldState(passwordInput, 'password', true);
    }

    if (confirmPasswordInput.value.length > 0) {
      validateConfirmPassword();
    }
  };

  // 5. Confirm Password Validation
  const validateConfirmPassword = () => {
    const value = confirmPasswordInput.value;
    const originalPassword = passwordInput.value;

    if (!value) {
      setFieldState(confirmPasswordInput, 'confirm-password', false, 'Please re-type your password.');
    } else if (value !== originalPassword) {
      setFieldState(confirmPasswordInput, 'confirm-password', false, 'Passwords do not match.');
    } else {
      setFieldState(confirmPasswordInput, 'confirm-password', true);
    }
  };

  // Password Visibility Toggle
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
  });

  // Event Listeners: Real-time and on Blur
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  phoneInput.addEventListener('input', validatePhone);
  passwordInput.addEventListener('input', evaluatePassword);
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);

  // Form Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Trigger all validations
    validateName();
    validateEmail();
    validatePhone();
    evaluatePassword();
    validateConfirmPassword();

    const isFormValid = Object.values(fieldStatus).every(Boolean);

    if (isFormValid) {
      document.getElementById('modal-desc').textContent = 
        `Account confirmed for ${nameInput.value.trim()} (${emailInput.value.trim()}).`;
      successModal.removeAttribute('hidden');
      form.reset();
      meterFill.style.width = '0%';
      strengthText.textContent = 'Strength: None';
      strengthText.style.color = '#6B7280';
      document.querySelectorAll('.field-group').forEach((g) => g.classList.remove('valid'));
    }
  });

  closeModalBtn.addEventListener('click', () => {
    successModal.setAttribute('hidden', '');
  });
});