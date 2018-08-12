const list = document.querySelector('#list');
const taskInput = document.querySelector('#input');
const addButton = document.querySelector('#add-btn')

addButton.addEventListener('click', newToDo);
taskInput.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		newToDo();
	}
});

let toDo = [];

if (localStorage.getItem('task') != null) {
	toDo = JSON.parse(localStorage.getItem('task'));
	toDo.forEach(renderToDo);
}

function newToDo() {
	const taskInputValue = taskInput.value;
	if (inputCheck(taskInputValue)) {
		const toDoItem = {title: taskInputValue, done: false, editing: false};
		toDo.push(toDoItem);
		localStorage.setItem('task', JSON.stringify(toDo));
		renderToDo(toDoItem);
	} else {
		alert("Try again!");
	}
}

function renderToDo(item) {
	const newLi = document.createElement('li');
	list.appendChild(newLi);
	
	const liText = document.createElement('span') 
	liText.textContent = item.title;
	newLi.appendChild(liText);
	liText.addEventListener('dblclick', editToDO);

	taskInput.value = "";
	
	const doneBtn = createDoneButton();
	newLi.appendChild(doneBtn);
	doneBtn.addEventListener('click', setDoneToDo);

	const delBtn = createDeleteButton();
	newLi.appendChild(delBtn);
	delBtn.addEventListener('click', setDeletedToDo);

	const editBox = document.createElement("div");
	editBox.className = "edit-box";
	newLi.appendChild(editBox);

	const editInput = document.createElement("input");
	editInput.type = "text";
	editInput.className = "edit-input";
	editBox.appendChild(editInput);
	editInput.addEventListener('keyup', setToDoEdeted);
}

function setToDoEdeted(e) {
	let editInput = event.target;
	let currentLi = document.querySelector('.edit-mode');
	let editBox = editInput.parentElement; 
	
	if (e.keyCode === 13){
		if (inputCheck(editInput.value)) {
			currentLi.firstChild.textContent = editInput.value;
			editBox.classList.toggle("edit-box");
			editInput.value = "";
			currentLi.classList.toggle("edit-mode");

			for (let i = 0; i < toDo.length; i++){
				if (toDo[i].editing === true) {
					toDo[i].title = currentLi.firstChild.textContent;
					toDo[i].editing = false;
				}
			}
		} else {
			alert('Try again!')
		}
	} else if (e.keyCode === 27) {
		editBox.classList.toggle("edit-box");
		editInput.value = "";
		currentLi.classList.toggle("edit-mode");
	}

	localStorage.setItem('task', JSON.stringify(toDo));
}

function setDeletedToDo() {
	const item = event.target;
	const parent = item.parentElement;
	
	toDo = toDo.filter((item) => {
		if (item.title != parent.firstChild.textContent) {
			return item;
		}
	});

	localStorage.setItem('task', JSON.stringify(toDo));

	parent.remove();
}

function setDoneToDo(event) {
	const item = event.target;
	const parent = item.parentElement;
	parent.classList.toggle("done");

	toDo.forEach((item) => {
		if (item.title == parent.firstChild.textContent) {
			return item.done ? item.done = false : item.done = true;
		}
	});
	
	localStorage.setItem('task', JSON.stringify(toDo));
}

function editToDO() {
	const targetItem = event.target;
	const element = targetItem.parentElement;
	element.classList.toggle("edit-mode");
	let editBox = element.querySelector(".edit-box");
	editBox.classList.toggle("edit-box");

	toDo.forEach((item) => {
		if (item.title == element.firstChild.textContent) {
			return item.editing ? item.editing = false : item.editing = true;
		}
	});
	
	localStorage.setItem('task', JSON.stringify(toDo));
}

function createDeleteButton() {
	const delBtn = document.createElement('button');
	delBtn.textContent = "\u2717";
	delBtn.className = "del-btn";
	return delBtn;
}

function createDoneButton() {
	const doneBtn = document.createElement('button');
	doneBtn.textContent = "\u2713";
	doneBtn.className = "done-btn";
	return doneBtn;
}

function inputCheck(task) {
	return task && !parseInt(task) && true;
}