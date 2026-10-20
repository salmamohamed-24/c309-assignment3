const mainForm = document.getElementById('signupForm');
const fieldName = document.getElementById('fullName');
const fieldEmail = document.getElementById('userEmail');
const fieldPass = document.getElementById('userPass');
const fieldConfirm = document.getElementById('confirmPass');
const fieldAge = document.getElementById('userAge');


const alertBanner = document.getElementById('statusAlert');
const toggleEye = document.getElementById('pwdToggleBtn');

const errorTargets = {
  name: document.getElementById('errFullName'),
  email: document.getElementById('errUserEmail'),
  pass: document.getElementById('errUserPass'),
  confirm: document.getElementById('errConfirmPass'),
  age: document.getElementById('errUserAge')
};


function applyFieldValidation(input, labelErr, msg) {
  const hasError = Boolean(msg);
  labelErr.textContent = msg || '';
  labelErr.classList.toggle('d-none', !hasError);
  input.classList.toggle('is-invalid', hasError);
  input.classList.toggle('is-valid', !hasError);
  input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
  return !hasError;
}



const checkName = () => {
  const val = fieldName.value.trim();
  if (!val) return applyFieldValidation(fieldName, errorTargets.name, 'Full name cannot be blank.');
  if (val.length < 2) return applyFieldValidation(fieldName, errorTargets.name, 'Name must have at least 2 characters.');
  return applyFieldValidation(fieldName, errorTargets.name, '');
};

const checkEmail = () => {
  const val = fieldEmail.value.trim();
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!val) return applyFieldValidation(fieldEmail, errorTargets.email, 'Email address is required.');
  if (!pattern.test(val)) return applyFieldValidation(fieldEmail, errorTargets.email, 'Enter a valid address (e.g. name@domain.com).');
  return applyFieldValidation(fieldEmail, errorTargets.email, '');
};

const checkPassword = () => {
  const val = fieldPass.value;
  if (!val) return applyFieldValidation(fieldPass, errorTargets.pass, 'Password is mandatory.');
  if (val.length < 8) return applyFieldValidation(fieldPass, errorTargets.pass, 'Minimum password length is 8.');
  return applyFieldValidation(fieldPass, errorTargets.pass, '');
};

const checkConfirmPassword = () => {
  const val = fieldConfirm.value;
  const match = fieldPass.value;
  if (!val) return applyFieldValidation(fieldConfirm, errorTargets.confirm, 'Confirmation is required.');
  if (val !== match) return applyFieldValidation(fieldConfirm, errorTargets.confirm, 'Password entries must match.');
  return applyFieldValidation(fieldConfirm, errorTargets.confirm, '');
};

const checkAge = () => {
  const val = fieldAge.value.trim();
  if (!val) return applyFieldValidation(fieldAge, errorTargets.age, 'Age cannot be empty.');
  const parsed = Number(val);
  if (!Number.isInteger(parsed) || isNaN(parsed)) return applyFieldValidation(fieldAge, errorTargets.age, 'Please provide an integer value.');
  if (parsed < 18 || parsed > 120) return applyFieldValidation(fieldAge, errorTargets.age, 'Allowed age range is 18 to 120.');
  return applyFieldValidation(fieldAge, errorTargets.age, '');
};

function displayAlert(isSuccess, heading, description) {
  alertBanner.className = `alert-box ${isSuccess ? 'alert-success' : 'alert-danger'}`;
  alertBanner.innerHTML = `<strong>${heading}</strong><div>${description}</div>`;
}


fieldName.addEventListener('input', checkName);
fieldEmail.addEventListener('input', checkEmail);
fieldPass.addEventListener('input', () => {
  checkPassword();
  if (fieldConfirm.value) checkConfirmPassword();
});
fieldConfirm.addEventListener('input', checkConfirmPassword);
fieldAge.addEventListener('input', checkAge);

toggleEye.addEventListener('click', () => {
  const isHidden = fieldPass.type === 'password';
  fieldPass.type = isHidden ? 'text' : 'password';
  fieldConfirm.type = isHidden ? 'text' : 'password';
  toggleEye.textContent = isHidden ? 'Hide Password' : 'View Password';
});

mainForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const v1 = checkName();
  const v2 = checkEmail();
  const v3 = checkPassword();
  const v4 = checkConfirmPassword();
  const v5 = checkAge();

  const isFormValid = v1 && v2 && v3 && v4 && v5;

  if (!isFormValid) {
    displayAlert(false, 'Validation Failed', 'Review the form requirements and correct the invalid fields.');
    return;
  }

  displayAlert(
    true,
    'Profile Registered Successfully',
    `Welcome, ${fieldName.value.trim()}. Account registered for ${fieldEmail.value.trim()}.`
  );
});