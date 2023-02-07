document.getElementById("addCard").addEventListener('click', createCard);
document.getElementById("editButton").addEventListener('click', editApiData);
document.getElementById("clearButton").addEventListener('click', clearFields);

let id = null;
let listOfdata = [];


//----------------------    Get API Function      ----------------------


function getAPI() {

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((json) => {

            listOfdata = json;
            showData()
        }

        );

}



//----------------------   Edit API Data Function   ----------------------


function editApiData(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    if (id === null) {
        alert('Please choose a card to edit');
    } else {

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                title: title,
                body: body,

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const arrayIndex = getPostIndex();


                listOfdata[arrayIndex] = json;


                showData();
            });

    }
}


//----------------------   Set Values Function    ----------------------


function setCurrentPostId(idTest) {

    id = idTest;
    let setTextTitle = "";
    let setTextArea = "";

    const findArray = getPostById(id);
    setTextTitle = findArray.title;
    setTextArea = findArray.body;
    document.getElementById('title').value = setTextTitle;
    document.getElementById('body').value = setTextArea;

}

//-----------------------      getPostById       -----------------------

function getPostById(globalid) {
    return listOfdata.find(item => item.id === globalid)
}


//---------------------- find arrayIndex function ----------------------

function getPostIndex() {
   
    const finadIndexOfArray = listOfdata.findIndex(findIndextest);
    
    function findIndextest(value) {
        return value.id === id;
    }

    return finadIndexOfArray;

}

//----------------------   Clear Fields Function  ----------------------



function clearFields() {
    document.getElementById('title').value = "";
    document.getElementById('body').value = "";
}


//----------------------    Show Data Function    ----------------------



function showData() {
    let outPut = "";
    listOfdata.forEach(element => {

        outPut += ` <a href="#fieldsScetion"><div onclick="setCurrentPostId(${element.id})" class="card">
                  
                    <h2> ${element.title} </h2>
                    <p>${element.body}</p>
                    </div>
                    </a>
                    <div class="sized-box"></div>
                    `;

    });
    document.getElementById('outPut').innerHTML = outPut;
}


//----------------------    create Card    ----------------------

function createCard() {

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;
    if (title === "" && body === "") {

        alert('please fill the title and the body to add a card')

    } else if (title === "") {
        alert('please fill the title to add a card')
    } else if (body === "") {
        alert('please fill the body to add a card')
    } else {

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {

                listOfdata.push(json)
                showData();
                console.log("card added");
            });
    }
}

getAPI();
