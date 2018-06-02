const validateSignupForm = (data) => {
  let errors = {};
  let countErrors = 0;
  if(data.email === ''){
    errors.email = 'Please enter an email';
    countErrors++;
  }
  if(data.username === ''){
    errors.username = 'Please enter a username';
    countErrors++;
  }
  if(data.password === ''){
    errors.password = 'Please enter a password';
    countErrors++;
  }
  if(data.passwordConfirm === '') {
    errors.passwordConfirm = 'Please confirm your password';
    countErrors++;
  }
  if(data.password !== '' && data.passwordConfirm !== '' && data.password !== data.passwordConfirm) {
    errors.passwordConfirm = 'Passwords does not match';
    countErrors++;
  }
  if(countErrors > 0){
    return {type: 'error', errors};
  } else {
    return {type: 'success', errors};
  }
}

export default validateSignupForm;
