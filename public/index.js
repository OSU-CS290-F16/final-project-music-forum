

/*
 * This function shows the modal to add a new todo note when the add note
 * button is clicked.
 */
function displayAddPostModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPostModalElem = document.getElementById('add-post-modal');

  // Show the modal and its backdrop.
  backdropElem.classList.remove('hidden');
  addPostModalElem.classList.remove('hidden');

}

/*
 * This function hides the modal to add a new todo note and clears any
 * existing values from the input fields whenever any of the modal close
 * actions are taken.
 */
function closeAddPostModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPostModalElem = document.getElementById('add-post-modal');

  // Hide the modal and its backdrop.
  backdropElem.classList.add('hidden');
  addPostModalElem.classList.add('hidden');

  clearTodoInputValues();

}

/*
 * This function clears any value present in any of the todo input elements.
 */
function clearTodoInputValues() {

  var postInputElems = document.getElementsByClassName('post-input-element');
  for (var i = 0; i < postInputElems.length; i++) {
    var input = postInputElems[i].querySelector('input, textarea');
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
function createNewPostBodyElem(text, label) {

  var newPostBodyElem = document.createElement('p');

  // If the body element has a label, add a span containing that label.
  if (label) {
    newPostBodyElem.classList.add('title-style');
    var labelSpanElem = document.createElement('span');
    labelSpanElem.classList.add(label);
    var labelSpanElemText = document.createTextNode(label + ': ');
    labelSpanElem.appendChild(labelSpanElemText);
    newPostBodyElem.appendChild(labelSpanElem);
  }

  var newPostBodyElemText = document.createTextNode(text);
  newPostBodyElem.appendChild(newPostBodyElemText);

  return newTodoBodyElem;

}

/*
 * This function creates a new <section> element for a post given all the
 * possible things that could go into the post.
 */
function createNewPostSection(song-name, artist-name, description, user-name) {

  // Create a new post section element.
  var newPostSection = document.createElement('section');
  newPostSection.classList.add('post');

  // Start the body of the new post element.
  var newPostBody = document.createElement('div');
  newPostBody.classList.add('post-body');


  var postBodySongName = createNewPostBodyElem(song-name, 'song-name');
  newPostBody.appendChild(postBodySongName);
  
  var postBodyArtistName = createNewPostBodyElem(artist-name, 'artist-name');
  newPostBody.appendChild(postBodyArtistName);
  
  if (description) {
    var postBodyDescription = createNewPostBodyElem(description, 'description');
	newPostBody.appendChild(postBodyDescription);
  }
  
  var postBodyUserName = createNewPostBodyElem(user-name, 'user-name');
  newPostBody.appendChild(postBodyUserName);



  // Add the body.
  newPostSection.appendChild(newPostBody);

  return newPostSection;

}

/*
 * This function inserts a new todo note based on the values specified in the
 * add note modal when the modal accept button is clicked.
 */
function insertNewPost() {

  // Grab the values from all the input fields.
  var postInputSongName = document.getElementById('todo-input-what').value;
  var postInputArtistName = document.getElementById('todo-input-where').value;
  var postInputDescription = document.getElementById('todo-input-when').value;
  var postInputUserName = document.getElementById('todo-input-who').value;


  // We only add the note if we have a value for required fields
  if (postInputSongName && postInputArtistName && postInputUserName) {

    // Create a new todo section and append it to the main element.
    var newPostSection = createNewPostSection(
      postInputSongName,
      postInputArtistName,
      postInputDescription,
      postInputDescription
    );
    var mainElement = document.querySelector('main');
    mainElement.appendChild(newPostSection);

    closeAddPostModal();

  } else {

    // If there's no required values specified, throw an alert.
    alert('You must specify a value for the required fields.');

  }

}

// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

  // Delegate an event listener to <main> to handle clicks on dismiss buttons.
  var main = document.querySelector('main');

  var addPostButtonElem = document.getElementById('add-post-button');
  addPostButtonElem.addEventListener('click', displayAddPostModal);

  var modalCloseButton = document.querySelector('#add-post-modal .modal-close-button');
  modalCloseButton.addEventListener('click', closeAddPostModal);

  var modalCancelButton = document.querySelector('#add-post-modal .modal-cancel-button');
  modalCancelButton.addEventListener('click', closeAddPostModal);

  var modalAcceptButton = document.querySelector('#add-post-modal .modal-accept-button');
  modalAcceptButton.addEventListener('click', insertNewPost);

});
