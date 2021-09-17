console.log('Script loaded');

const bugButton = document.querySelector('#bugButton');
const bugForm = document.querySelector('#bugForm');
const submitButton = document.querySelector('#submit');

bugButton.addEventListener('click', (e) => {
  document.getElementsByClassName('popup')[0].classList.add('active');
});

submitButton.addEventListener('click', (e) => {
  const dataToSend = {
    problem: document.getElementById('problem').value,
    errorText: document.getElementById('errorText').value,
    commit: document.getElementById('commit').value,
    featureId: parseInt(document.querySelector('.feature-radio:checked').value),
  };
  console.log('dataToSend :>> ', dataToSend);
  axios
    .post('/', dataToSend)
    .then((response) => {
      console.log('response.data :>> ', response.data);
    })
    .then(bugForm.classList.toggle('active'))
    .catch((err) => console.log('err :>> ', err));
});
