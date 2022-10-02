
let count = 1;
const form = document.getElementById("userForm")

function saveUsersClose() {
    saveUsers();
    document.getElementById('btnClose').click();
}

async function deleteUser(id) {
   const response = await axios.delete(`/user/delete-user/${id}`)
   if(response.status === 200){
    location.reload();
   }
}
async function editUser(id) {
    // document.getElementById('userForm').reset();
    const response = await axios.get(`/user/${id}`);
    debugger;
    // const crrUser = response.data.data;
    const crrUser = response.data.user;
    for (const key in crrUser) {
        if (key == "first_name") {
            document.getElementById('firstName').setAttribute('value',`${crrUser[key]}`);
        }
        else if (key == "last_name") {
            document.getElementById('lastName').setAttribute('value',`${crrUser[key]}`);
        }
        else if (key == "phone") {
            document.getElementById('phone').setAttribute('value',`${crrUser[key]}`);
        }
        else if (key == "email") {
            document.getElementById('email').setAttribute('value',`${crrUser[key]}`);
        }
        else if (key == "password") {
            document.getElementById('password').setAttribute('value',`${crrUser[key]}`);
        }
    }

    form.action = `/user/${id}`
    form.method = 'post'
}

function renderGrid() {
    let allTrHtml = "";
    usersData.map(x => {
        allTrHtml += `<tr>
            <td>${x.id}</td>
            <td>${x.firstName}</td>
            <td>${x.lastName}</td>
            <td>${x.range}</td>
            <td>${x.gender}</td>
            <td>${x.hobbies.join()}</td>
            <td>
                <button class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#usersCrudModal" onclick="editUser(${x.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${x.id})">Delete</button>
            </td>
        </tr>`;
    })
    document.querySelector('#usersGrid tbody').innerHTML = allTrHtml;
}