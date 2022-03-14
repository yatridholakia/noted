//constants and global variables
let noteId = 0;
const EDIT_NOTE = "Edit Note";
const ADD_NEW_NOTE = "Add New Note";
let noteInQuestion = null;
//-------------------------------

//Notes static array
const NOTES = [
  {
    id: noteId++,
    data: "This is a first new note",
  },
  {
    id: noteId++,
    data: "This is a second new note",

  },
  {
    id: noteId++,
    data: "This is a third new note",

  },
];

const deleteNoteHandler = (e)=>{
  e.stopPropagation();
  const noteToDelete = e.target.parentNode;
  const noteLibrary = document.querySelector("#note-library");
  const allNotes = document.querySelectorAll(".note");
  const selectedNote = [...allNotes].filter(
    (note) => note.dataset.key === noteToDelete.dataset.key
  );
  noteLibrary.removeChild(selectedNote[0]);
  // console.log(allNotes);
  // console.log(noteToDelete);
}
//-------------------------------------------------------------------

//adding notes manually to DOM
const noteLibrary = document.querySelector("#note-library");
NOTES.forEach((note) => {
  const newNoteDiv = document.createElement("div");
  newNoteDiv.classList.add("note");
  newNoteDiv.dataset.key = note.id;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "x";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener('click', (deleteNoteHandler));
  newNoteDiv.append(deleteBtn);
  noteLibrary.append(newNoteDiv);
  const pTag = document.createElement("p");
  pTag.innerText = note.data;
  newNoteDiv.append(pTag);
  noteLibrary.append(newNoteDiv);
});
//---------------------------------------------------------------------

//featching elements
const modalTitle = document.querySelector("#modal-title");
const backdrop = document.querySelector("#modal-backdrop");
const notes = document.querySelectorAll(".note");
const closeButton = document.querySelector(".btnCancel");
const saveButton = document.querySelector(".btnSave");
const addNewNoteButton = document.querySelector("#btnAdd");
//----------------------------------------------------------------------

//functions and Event Handlers
const addNewNoteHandler = () => {
  modalTitle.innerText = ADD_NEW_NOTE;
  const modalInput = document.querySelector("#modal-body-input");
  modalInput.value = "";
  backdrop.style.display = "block";
};

const openEditModal = (e) => {
  const modalInput = document.querySelector("#modal-body-input");
  const note = e.srcElement;
  noteInQuestion = note.dataset.key;
  modalTitle.innerText = EDIT_NOTE;
  modalInput.value = note.children[1].innerText;
  backdrop.style.display = "block";
};

const closeModal = () => {
  backdrop.style.display = "none";
  noteInQuestion = null;
};


const saveButtonHandler = () => {
  const modalInput = document.querySelector("#modal-body-input");

  if (modalInput.value.trim().length < 1) {
    modalInput.classList.add("invalid");
    return;
  }
  if (noteInQuestion != null) {
    const notes = document.querySelectorAll(".note");
    //   console.log(modalInput);
    // NOTES.push({
    //   id: noteId++,
    //   data: modalInput.value,
    // });
    //console.log(notes);
    const editedNote = [...notes].filter(
      (note) => note.dataset.key === noteInQuestion
    );
    editedNote[0].children[1].innerText = modalInput.value;
  } else {
    // const noteLibrary = document.querySelector("#note-library");
    const newNoteDiv = document.createElement("div");
    newNoteDiv.classList.add("note");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener('click', (deleteNoteHandler));
    newNoteDiv.append(deleteBtn);
    newNoteDiv.dataset.key = noteId++;
    const pTag = document.createElement("p");
    pTag.innerText = modalInput.value;
    newNoteDiv.append(pTag);
    noteLibrary.append(newNoteDiv);
    newNoteDiv.addEventListener("click", openEditModal);
  }

  closeModal();
};

//-----------------------------------------------------------

//setting event listeners
notes.forEach((note) => {
  note.addEventListener("click", openEditModal);
});
closeButton.addEventListener("click", closeModal);
saveButton.addEventListener("click", saveButtonHandler);
addNewNoteButton.addEventListener("click", addNewNoteHandler);
//-----------------------------------------
