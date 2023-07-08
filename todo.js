


let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodobutton=document.getElementById("addTodobutton");
 

let saveTodoButton=document.getElementById('saveTodoButton');
saveTodoButton.onclick=function(){
  localStorage.setItem('todoList',JSON.stringify(todoList));
}


function getTodoFromLocalStorage(){
  let GettingTodo=localStorage.getItem('todoList');
  let parsedTodo=JSON.parse(GettingTodo);
  if(parsedTodo===null){
    return [];
  }
  else{
    return parsedTodo;
  }
}


let todoList =getTodoFromLocalStorage();
 
function createAndAppendTodo(todo) {

  let checkBoxID="checkBox"+todo.uniqueID;
  let labelID="label"+todo.uniqueID;
  let todoId='todo'+todo.uniqueID;

  function StatusChange(checkBoxID,labelID,todoId){
    let checkBoxElement=document.getElementById(checkBoxID);
    let a=console.log(checkBoxElement.checked);

    let labelIDElement=document.getElementById(labelID);
    labelIDElement.classList.toggle("checked");

    let TodoObjectindex=todoList.findIndex(function(eachTodo){
      let eachTodoId='todo'+eachTodo.uniqueID;
      if(eachTodoId===todoId){
           return true;
      }else{
        return false;
      }


    });


      let TodoObject=todoList[TodoObjectindex];

      if(TodoObject.isChecked===true){
        TodoObject.isChecked=false;
      }else{
        TodoObject.isChecked=true;
      }

  }
  

  function removeTodo(todoId){
    let todoElementId=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteIndex=todoList.findIndex(function(eachItem){
      let eachTodoIndex='todo'+eachItem.uniqueID;
      if(eachTodoIndex===todoId){
        return true;
      }else{
        return false;
      }
    });
    todoList.splice(deleteIndex,1);
    console.log(todoList);
  }

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id=todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkBoxID;
  inputElement.classList.add("checkbox-input");
  inputElement.isChecked=todo.isChecked;
  inputElement.onclick=function(){
    StatusChange(checkBoxID,labelID,todoId);
  }
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkBoxID);
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
   labelElement.id = labelID;
   if(todo.isChecked===true){
    labelElement.classList.add("checked");
   }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick=function(){
    removeTodo(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}




function OnAddTodo(){
  let todoCount=todoList.length;
  todoCount=todoCount+1;
let userInputElement=document.getElementById('todoUserInput');
let userInputValue=userInputElement.value;
 
 if(userInputValue === ""){
  alert('Please Enter a valid text');
  return;
};


 let newTodo={

  text:userInputValue,
  uniqueID:todoCount,
  isChecked:false
 };
todoList.push(newTodo);

 createAndAppendTodo(newTodo);

 
 userInputValue.value='';
};

addTodobutton.onclick = function(){
  OnAddTodo();
  
 };

 


for (let todo of todoList) {
  createAndAppendTodo(todo);
}
