const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#msg1');
const message2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error) {
                console.log(data.error);
            }
            else {
                message1.textContent = data.forecast;
                message2.textContent = data.location;
                //console.log(data.address);
            }
        })
    })



})
