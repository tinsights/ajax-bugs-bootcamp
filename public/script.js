console.log('Script loaded');
console.log('loggedIn :>> ', loggedIn);

const bugButton = document.querySelector('#bugButton');
const bugForm = document.querySelector('#bugForm');
const bugSubmit = document.querySelector('#submit');
const bugContainer = document.getElementById('bug-container');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

if (loggedIn) {
  bugContainer.classList.remove('hidden');
}

bugButton.addEventListener('click', () => {
  bugForm.classList.add('active');
  loginForm.classList.remove('active');
  signupForm.classList.remove('active');
});

document.getElementById('open-signup-btn').addEventListener('click', () => {
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
  bugForm.classList.remove('active');
});

document.getElementById('open-login-btn').addEventListener('click', () => {
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
  bugForm.classList.remove('active');
});

const dismissBtns = [...document.getElementsByClassName('dismiss-popup-btn')];
dismissBtns.forEach((button, index) => {
  button.addEventListener('click', () => {
    document.getElementsByClassName('popup')[index].classList.remove('active');
  });
});

bugSubmit.addEventListener('click', () => {
  const dataToSend = {
    problem: document.getElementById('problem').value,
    errorText: document.getElementById('errorText').value,
    commit: document.getElementById('commit').value,
    featureId: parseInt(document.querySelector('.feature-radio:checked').value, 10),
  };
  console.log('dataToSend :>> ', dataToSend);
  axios
    .post('/bug', dataToSend)
    .then((response) => {
      console.log('response.data :>> ', response.data);
    })
    .then(bugForm.classList.toggle('active'))
    .catch((err) => console.log('err :>> ', err));
});

function signUp() {
  console.log('HERE');
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const signUpData = {
    email,
    password,
  };
  console.log('signUpData :>> ', signUpData);
  axios
    .post('/signup', signUpData)
    .then((response) => {
      console.log('response :>> ', response.data.errors);
      if (response.data.errors) {
        alert(response.data.errors[0].message);
      }
      else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
      }
    })
    .catch((err) => console.log('err :>> ', err));
}

loginBtn.addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const loginData = {
    email,
    password,
  };
  console.log('loginData :>> ', loginData);
  axios
    .post('/login', loginData)
    .then((response) => {
      console.log('response :>> ', response.data.errors);
      if (response.data.errors) {
        alert(response.data.errors[0].message);
      } else {
        loginForm.classList.remove('active');
        bugForm.classList.add('active');
        bugContainer.classList.remove('hidden');
      }
    })
    .catch((err) => console.log('err :>> ', err));
});
