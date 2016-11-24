/*
 * This function removes a particular todo note when its dismiss button is
 * clicked.  This event listener should be delegated to the <main> element.
 */
function removeTodoOnDelegatedDismissClick(event) {

  var clickedElem = event.target;
  var clickedElemParent = event.target.parentNode;

  /*
   * If the clicked element is the dismiss button of a todo note, then remove
   * the todo from its parent.
   */
  if (clickedElem.classList.contains('dismiss-button') && clickedElemParent.classList.contains('todo')) {
    var todoNoteElemParent = clickedElemParent.parentNode;
    todoNoteElemParent.removeChild(clickedElemParent);
  }

}

/*
 * This function shows the modal to add a new todo note when the add note
 * button is clicked.
 */
function displayAddNoteModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addNoteModalElem = document.getElementById('add-note-modal');

  // Show the modal and its backdrop.
  backdropElem.classList.remove('hidden');
  addNoteModalElem.classList.remove('hidden');

}

/*
 * This function hides the modal to add a new todo note and clears any
 * existing values from the input fields whenever any of the modal close
 * actions are taken.
 */
function closeAddNoteModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addNoteModalElem = document.getElementById('add-note-modal');

  // Hide the modal and its backdrop.
  backdropElem.classList.add('hidden');
  addNoteModalElem.classList.add('hidden');

  clearTodoInputValues();

}

/*
 * This function clears any value present in any of the todo input elements.
 */
function clearTodoInputValues() {

  var todoInputElems = document.getElementsByClassName('todo-input-element');
  for (var i = 0; i < todoInputElems.length; i++) {
    var input = todoInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

/*
 * This function creates a single child for the todo-body element.  These
 * children contain the "where", "when", "who", and "details" information for
 * the todo.  They are formatted as a <p> element containing the provided
 * text.  If a label is provided, that label is added as a special <span>
 * element as the first child of the <p>, and the <p> is given class
 * "indent-wrapped".  The result is either this:
 *
 * <p>text<p>
 *
 * or
 *
 * <p class="indent-wrapped"><span class="label">label: </span>text</p>
 */
function createNewTodoBodyElem(text, label) {

  var newTodoBodyElem = document.createElement('p');

  // If the body element has a label, add a span containing that label.
  if (label) {
    newTodoBodyElem.classList.add('indent-wrapped');
    var labelSpanElem = document.createElement('span');
    labelSpanElem.classList.add(label);
    var labelSpanElemText = document.createTextNode(label + ': ');
    labelSpanElem.appendChild(labelSpanElemText);
    newTodoBodyElem.appendChild(labelSpanElem);
  }

  var newTodoBodyElemText = document.createTextNode(text);
  newTodoBodyElem.appendChild(newTodoBodyElemText);

  return newTodoBodyElem;

}

/*
 * This function creates a new <section> element for a todo given all the
 * possible things that could go into the todo.
 */
function createNewTodoSection(what, where, when, who, details) {

  // Create a new todo section element.
  var newTodoSection = document.createElement('section');
  newTodoSection.classList.add('todo');

  // Add the todo header.
  var newTodoHeader = document.createElement('h2');
  var newTodoHeaderText = document.createTextNode(what);
  newTodoHeader.appendChild(newTodoHeaderText);
  newTodoSection.appendChild(newTodoHeader);

  // Start the body of the new todo element.
  var newTodoBody = document.createElement('div');
  newTodoBody.classList.add('todo-body');

  // If we have a "where" specified, add that to the body.
  if (where) {
    var todoBodyWhere = createNewTodoBodyElem(where, 'where');
    newTodoBody.appendChild(todoBodyWhere);
  }

  // If we have a "when" specified, add that to the body.
  if (when) {
    var todoBodyWhen = createNewTodoBodyElem(when, 'when');
    newTodoBody.appendChild(todoBodyWhen);
  }

  // If we have a "who" specified, add that to the body.
  if (who) {
    var todoBodyWho = createNewTodoBodyElem(who, 'who');
    newTodoBody.appendChild(todoBodyWho);
  }

  // If we have details specified, add them to the body.
  if (details) {
    var todoBodyDetails = createNewTodoBodyElem(details);
    newTodoBody.appendChild(todoBodyDetails);
  }

  // Add the body.
  newTodoSection.appendChild(newTodoBody)

  // Add the dismiss button and hook up a click event listener to it.
  var newTodoDismissButton = document.createElement('div');
  newTodoDismissButton.classList.add('dismiss-button');
  var newTodoDismissButtonText = document.createTextNode('×');
  newTodoDismissButton.appendChild(newTodoDismissButtonText);
  newTodoSection.appendChild(newTodoDismissButton);

  return newTodoSection;

}

/*
 * This function inserts a new todo note based on the values specified in the
 * add note modal when the modal accept button is clicked.
 */
function insertNewTodo() {

  // Grab the values from all the input fields.
  var todoInputWhat = document.getElementById('todo-input-what').value;
  var todoInputWhere = document.getElementById('todo-input-where').value;
  var todoInputWhen = document.getElementById('todo-input-when').value;
  var todoInputWho = document.getElementById('todo-input-who').value;
  var todoInputDetails = document.getElementById('todo-input-details').value;

  // We only add the note if we have a value for "what".
  if (todoInputWhat) {

    // Create a new todo section and append it to the main element.
    var newTodoSection = createNewTodoSection(
      todoInputWhat,
      todoInputWhere,
      todoInputWhen,
      todoInputWho,
      todoInputDetails
    );
    var mainElement = document.querySelector('main');
    mainElement.appendChild(newTodoSection);

    closeAddNoteModal();

  } else {

    // If there's no "what" value specified, throw an alert.
    alert('You must specify a value for the "what" field.');

  }

}

// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

  // Delegate an event listener to <main> to handle clicks on dismiss buttons.
  var main = document.querySelector('main');
  main.addEventListener('click', removeTodoOnDelegatedDismissClick);

  var addNoteButtonElem = document.getElementById('add-note-button');
  addNoteButtonElem.addEventListener('click', displayAddNoteModal);

  var modalCloseButton = document.querySelector('#add-note-modal .modal-close-button');
  modalCloseButton.addEventListener('click', closeAddNoteModal);

  var modalCancalButton = document.querySelector('#add-note-modal .modal-cancel-button');
  modalCancalButton.addEventListener('click', closeAddNoteModal);

  var modalAcceptButton = document.querySelector('#add-note-modal .modal-accept-button');
  modalAcceptButton.addEventListener('click', insertNewTodo);

});
