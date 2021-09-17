console.log('Script loaded');

const bugButton = document.querySelector('#bugButton');
const bugForm = document.querySelector('#bugForm');
const submitButton = document.querySelector('#submit');

bugButton.addEventListener('click', (e) => {
  bugForm.classList.toggle('hidden');
});

submitButton.addEventListener('click', (e) => {
  let inputs = [...document.querySelectorAll('input')];
  console.log('inputs :>> ', inputs);
  inputs = inputs.map((input) => input.value);
  console.log('inputs :>> ', inputs);
  const dataToSend = {
    problem: inputs[0],
    errorText: inputs[1],
    commit: inputs[2],
  };
  axios
    .post('/', dataToSend)
    .then((response) => {
      console.log('response.data :>> ', response.data);
    })
    .then(bugForm.classList.toggle('hidden'))
    .catch((err) => console.log('err :>> ', err));
});
