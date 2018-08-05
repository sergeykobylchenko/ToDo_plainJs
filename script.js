const list = document.querySelector('#list');
const taskInput = document.querySelector('#input');
const addButton = document.querySelector('#add-btn')

const newToDo = () => {
	let newLi = document.createElement('li');
	let taskInputValue = taskInput.value;
	newLi.textContent = taskInputValue;
	
	inputCheck(taskInputValue) ? list.appendChild(newLi) : alert("Try again!");
	
	taskInput.value = "";
	
	const doneBtn = createDoneButton();
	newLi.appendChild(doneBtn);
	doneBtn.addEventListener('click', setDoneToDo);

	const delBtn = createDeleteButton();
	newLi.appendChild(delBtn);
	delBtn.addEventListener('click', setDeletedToDo);

	let editBox = document.createElement("div");
	editBox.className = "edit-box";
	newLi.appendChild(editBox);
	newLi.addEventListener('dblclick', editToDO);

	let editInput = document.createElement("input");
	editInput.type = "text";
	editBox.appendChild(editInput);
/* 	let cancelBtn = document.createElement("span");
	cancelBtn.textContent = "\u2717";
	cancelBtn.className = "cancel-btn";
	editBox.appendChild(cancelBtn); */
	editInput.addEventListener('keyup', (e) => {	
		if (e.keyCode === 13){
			if (inputCheck(editInput.value)) {
				newLi.firstChild.textContent = editInput.value;
				editBox.classList.toggle("edit-box");
				editInput.value = "";
				newLi.classList.toggle("edit-mode");
			} else {
				alert('Try again!')
			}
		} else if (e.keyCode === 27) {
			editBox.classList.toggle("edit-box");
			editInput.value = "";
			newLi.classList.toggle("edit-mode");
		}
	});
}

addButton.addEventListener('click', newToDo);
taskInput.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		newToDo();
	}
});

const setDeletedToDo = (event) => {
	let item = event.target;
	let parent = item.parentElement;
	parent.remove();
}

const setDoneToDo = (event) => {
	let item = event.target;
	let parent = item.parentElement;
	parent.classList.toggle("done");
}

const editToDO = () => {
	let item = event.target;
	item.classList.toggle("edit-mode");
	let editBox = item.querySelector(".edit-box");
	editBox.classList.toggle("edit-box");
}

const createDeleteButton = () => {
	let delBtn = document.createElement('button');
	delBtn.textContent = "\u2717";
	delBtn.className = "del-btn";
	return delBtn;
}

const createDoneButton = () => {
	let doneBtn = document.createElement('button');
	doneBtn.textContent = "\u2713";
	doneBtn.className = "done-btn";
	return doneBtn;
}

const inputCheck = (task) => {
	if (!task) {
		false;
	} else if (parseInt(task)) {
		return false;
	} else {
		return true;
	}
}