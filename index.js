let email = document.getElementById('email');
let name = document.getElementById('name');
let password = document.getElementById('password');
let dob = document.getElementById('dob');
let terms = document.getElementById('terms');
let submit = document.getElementById('submit');
/* 
<tr>
    <td>John</td>
    <td>john.doe</td>
    <td>123456</td>
    <td>01/01/2000</td>
    <td>Yes</td>
</tr>*/
localStorage.clear();
let form = document.getElementById('user-form');

const retrieveUserEntries = () => {
    let entries = localStorage.getItem('user-entries');
    if (entries) {
        userEntries = JSON.parse(entries);
        return userEntries;
    }
    else {
        return [];
    }
};

userEntries = retrieveUserEntries();

const displayUserEntries = () => {
    const entries = retrieveUserEntries();

    const tableEntries = entries.map((entry) => {
    let table = document.getElementById('user-table');
    let nameCol = `<td>${entry.name}</td>`;
    let emailCol = `<td>${entry.email}</td>`;
    let passwordCol = `<td>${entry.password}</td>`;
    let dobCol = `<td>${entry.dob}</td>`;
    let termsCol = `<td>${entry.terms}</td>`;
    let row = `<tr>${nameCol}${emailCol}${passwordCol}${dobCol}${termsCol}</tr>`;
    return row;
    }).join('\n');

    const table = `<table class="table-auto w-full block"><tr>
    
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">Dob</th>
    <th class="px-4 py-2">Accepted Terms?</th>
    </tr>${tableEntries}</table>`;

    const userEntriesDiv = document.getElementById('user-entries');
    userEntriesDiv.innerHTML = table;

    
};


const saveUserForm = (event) => {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let terms = document.getElementById('terms').checked;
    let entry = {
        name,
        email,
        password,
        dob,
        terms
    };
    
    userEntries.push(entry);
    localStorage.setItem('user-entries', JSON.stringify(userEntries));
    form.reset();
    displayUserEntries();

};

form.addEventListener('submit', saveUserForm);



// code for custom invalid message for name
name.addEventListener('invalid', function (event) {
    if (name.validity.valueMissing) {
        name.setCustomValidity('Please enter your name');
    } else {
        name.setCustomValidity('');
    }
});


//code for custom invalid message for email
email.addEventListener('invalid', function (event) {
    if (email.validity.valueMissing) {
        email.setCustomValidity('Please enter an email address');
    } else {
        email.setCustomValidity('');
    }
});

password.addEventListener('invalid', () => {
    if (password.validity.valueMissing) {
        password.setCustomValidity('Please enter a password');
    } else {
        password.setCustomValidity('');
    }
});

dob.addEventListener('input', () => {
    let inputDate = new Date(dob.value);
    let inputYear = inputDate.getFullYear();
    if(inputYear < minYearInt || inputYear > maxYearInt){
        dob.setCustomValidity('Please enter a date between 18 and 55 years');
    }
    else{
        dob.setCustomValidity('');
    }
});


//validate age greater than 18 and less than 55
let todayDate = new Date().toISOString().split('T')[0].split('-');
let maxYearInt = parseInt(todayDate[0]) - 18;
let minYearInt = parseInt(todayDate[0]) - 55;
let maxDate = maxYearInt.toString() +"-" + todayDate[1] +"-"+ todayDate[2];
let minDate = minYearInt.toString() +"-"+ todayDate[1] + "-"+todayDate[2];


document.getElementsByName("dob")[0].setAttribute('max', maxDate);
document.getElementsByName("dob")[0].setAttribute('min', minDate);
displayUserEntries();






