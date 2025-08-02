function maskPass(password) {
    let str ="";
    for (let index = 0; index < password.length; index++) {
        str += "*";
    }
    return str;
}

// copy text 
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {

            /* clipboard successfully set */
            // alert("Copied the text: " + txt);
            document.getElementById("alert").style.display= "inline";
            setTimeout(()=>{
                    document.getElementById("alert").style.display= "none"
            },1500)
        },
        () => {
            /* clipboard write failed */
            alert("Clipboard copying failed")
        },
    );
}
const deletePasswords = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    // alert(`Succesfully Deleted ${website} Password`)
    document.getElementById("delete").style.display= "inline";
            setTimeout(()=>{
                    document.getElementById("delete").style.display= "none"
            },1500)
    showPasswords();
}

// table filling
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null) {
        tb.innerHTML = "No data to show";
    }
    else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>delete</th>
        </tr>`
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];


            str += `<tbody><tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${element.website} <img src="copy.svg" alt="Copy Button" style="display: inline;" width="10px" height="10px" onclick="copyText('${element.website}')" style="cursor: pointer;"
                    </th>
                    <td class="px-6 py-4">
                        ${element.username} <img src="copy.svg" alt="Copy Button" style="display: inline;" width="10px" height="10px" onclick="copyText('${element.username}')" style="cursor: pointer;"
                    </td>
                    <td class="px-6 py-4">
                        ${maskPass(element.password)}<img src="copy.svg" alt="Copy Button" style="display: inline;" width="10px" height="10px" onclick="copyText('${element.password}')" style="cursor: pointer;"
                    </td>
                    
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><button  class="btnsm" onclick ="deletePasswords('${element.website}')">Delete</button></a>
                    </td>
                </tr></tbody> `

        //     str += ` <tr>
        //     <td>${element.website} <img src="copy.svg" alt="Copy Button" width="10px" height="10px" onclick="copyText('${element.website}')" style="cursor: pointer;"/></td>
        //     <td>${element.username} <img src="copy.svg" alt="Copy Button" width="10px" height="10px" onclick="copyText('${element.username}')" style="cursor: pointer;"/></td>
        //     <td>${maskPass(element.password)}<img src="copy.svg" alt="Copy Button" width="10px" height="10px" onclick="copyText('${element.password}')" style="cursor: pointer;"/></td>
        //     <td><button class="btnsm" onclick ="deletePasswords('${element.website}')">Delete</button></td>
        // </tr>`

        }
        tb.innerHTML = tb.innerHTML + str;
    }
    website.value = '';
    username.value = '';
    password.value = '';
}
console.log('Working');
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(username.value);
    console.log(password.value);
    let passwords = localStorage.getItem("passwords");
    console.log(passwords);

    if (passwords == null) {
        json = [];
        json.push({ website: website.value, username: username.value, password: password.value });
        // alert("password saved")

        document.getElementById("added").style.display= "inline";
            setTimeout(()=>{
                    document.getElementById("added").style.display= "none"
            },1500)

        localStorage.setItem("passwords", JSON.stringify(json));
    }
    else {
        json = JSON.parse(localStorage.getItem("passwords"));
        json.push({ website: website.value, username: username.value, password: password.value });
        // alert("password saved")

        document.getElementById("added").style.display= "inline";
            setTimeout(()=>{
                    document.getElementById("added").style.display= "none"
            },1500)

        localStorage.setItem("passwords", JSON.stringify(json));

    }
    showPasswords();

})