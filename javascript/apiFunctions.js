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
        console.log('Please choose a card to edit');
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
                const arrayIndex = findArrayIndex();


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

function findArrayIndex() {
    let arrayIndex = 0;
    const findArray = listOfdata.find(findName);
    const finadIndexOfArray = listOfdata.findIndex(findIndextest);
    arrayIndex = finadIndexOfArray;
    function findName(listOfItems) {
        return listOfItems.id === id;
    }
    function findIndextest(value) {
        return value === findArray;
    }

    return arrayIndex;


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
    if (title === "" & body === "") {

        console.log("title & body is empty")

    } else if (title === "") {
        console.log("title is empty");
    } else if (body === "") {
        console.log("body is empty");
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
