const list = document.querySelector('#list');
const taskInput = document.querySelector('#input');
const addButton = document.querySelector('#add-btn')

const newToDo = () => {
	let newLi = document.createElement('li');
	let taskInputValue = taskInput.value;
	newLi.textContent = taskInputValue;
	
	taskInputValue ? list.appendChild(newLi) : alert("Try again!");
	
	taskInput.value = "";
	
	let doneBtn = document.createElement('button');
	doneBtn.textContent = "\u2713";
	// doneBtn.textContent = "It's Done!";
	doneBtn.className = "done-btn";
	newLi.appendChild(doneBtn);
	doneBtn.addEventListener('click', setDoneToDo);

	let delBtn = document.createElement('button');
	delBtn.textContent = "\u2717";
	// delBtn.textContent = "Delete It!";
	delBtn.className = "del-btn";
	newLi.appendChild(delBtn);
	delBtn.addEventListener('click', setDeletedToDo);

	// newLi.addEventListener('click', editToDO);
}

addButton.addEventListener('click', newToDo);

const setDeletedToDo = (event) => {
	// let deleteItem = document.querySelectorAll(".del-btn");
	// console.log(deleteItem);
	let item = event.target;
	let parent = item.parentElement;
	parent.remove();
}

const setDoneToDo = (event) => {
	// let doneItem = document.querySelectorAll(".done-btn");
	// console.log(doneItem);
	let item = event.target;
	let parent = item.parentElement;
	parent.classList.toggle("done");
}

const editToDO = () => {
	let item = event.target;
	let parent = item.parentElement;

	let newInput = document.createElement('input')
	// parentElem.replaceChild(newElem, elem)
	item.appendChild(newInput)	

	item.textContent = newInput.value;
}
