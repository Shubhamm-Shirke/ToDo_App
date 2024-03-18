let addbtn = document.getElementById("add-btn");
let inputTodoItem = document.querySelector("#todo-input");
let todoContainer = document.querySelector(".todo-container");
let tododate = document.querySelector("#todo-date");

// let todolist = [
  // {
    // item: "buy Milk",
    // dueDate: "4/10/223",
  // },
  // {
    // item: "Got To home",
    // dueDate: "4/10/2024",
  // },
// ];

let todolist = JSON.parse(localStorage.getItem("todolist")) || [];


addbtn.addEventListener("click", () => {
  // console.log("clicked");
  let actualVal = inputTodoItem.value;
  let tododateVal = tododate.value;
  todolist.push(
    {
    item:actualVal , 
    dueDate:tododateVal
    }
  );
  localStorage.setItem("todolist" , JSON.stringify(todolist));
  // console.log(actualVal);
  inputTodoItem.value = "";
  tododate.value="";
  displayItems();
});

function displayItems() {

  // let newHtml = "";
  // for (let i = 0; i < todolist.length; i++) {
  //   // let work = todolist[i].item;
  //   // let date = todolist[i].dueDate;
  
  //   let {item , dueDate} = todolist[i];

  //   newHtml += `
  //       <span>${item}</span>
  //       <span>${dueDate}</span>
  //       <button class='delete-btn' onclick="todolist.splice(${i},1); displayItems();">Delete</button>
  //             `;
  // }
  // todoContainer.innerHTML = newHtml;


  let newHtml = "";
  todolist.forEach((itemVals,index)=>{
    let {item , dueDate} = itemVals;
    newHtml += `
           <span>${item}</span>
           <span>${dueDate}</span>
           <button class="delete-btn" data-index=${index}>Delete</button> 
           <button class="edit-btn" data-index=${index}>Edit</button> 
           `
  }); 
  todoContainer.innerHTML = newHtml;

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button)=>{
    button.addEventListener("click",(event)=>{
      const indexOfdeleteObj = event.target.getAttribute("data-index");
      deleteObject(indexOfdeleteObj);
    });
  });

  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button)=>{
    button.addEventListener("click" , (event)=>{
        const indexOfeditObj = event.target.getAttribute("data-index");
        // console.log(indexOfeditObj);
        // item whitch we want to edit
        editObject(indexOfeditObj)
    });
  });
}

function editObject(index) {
  const itemToEdit = todolist[index];
        const newItem = prompt("Enter New Todo" , itemToEdit.item);
        const newdueDate = prompt("Enter New DeadLine" , itemToEdit.dueDate);
        todolist[index] = {
           item : newItem,
           dueDate : newdueDate
        }
        localStorage.setItem("todolist" , JSON.stringify(todolist));
        displayItems();
}

function deleteObject(index) {
  todolist.splice(index,1);
  localStorage.setItem("todolist" , JSON.stringify(todolist));
  displayItems();
}
displayItems();
