

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

  clearPostInputValues();

}

/*
 * This function clears any value present in any of the todo input elements.
 */
function clearPostInputValues() {

  var postInputElems = document.getElementsByClassName('post-input-element');
  for (var i = 0; i < postInputElems.length; i++) {
    var input = postInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

/*
 * This function creates a single child for the post-body element.
 */
function createNewPostBodyElem(title, label, text) {

  var newPostBodyElem = document.createElement('p');

  // If the body element has a label, add a span containing that label.
  if (label) {
	  
	newPostBodyElem.classList.add('title-style');
	var labelSpanElem = document.createElement('span');
	labelSpanElem.classList.add(label);
	var labelSpanElemText = document.createTextNode(title + ': ');
	labelSpanElem.appendChild(labelSpanElemText);
	newPostBodyElem.appendChild(labelSpanElem);
	
  }

  var newPostBodyElemText = document.createTextNode(text);
  newPostBodyElem.appendChild(newPostBodyElemText);

  return newPostBodyElem;

}

/*special case function for user name*/
function createNewPostBodyUserName(title, label, text) {

  var newPostBodyElem = document.createElement('p');

  // If the body element has a label, add a span containing that label.
  if (label) {
	  
	newPostBodyElem.classList.add('title-style');
	var labelDivElem = document.createElement('div');
	labelDivElem.classList.add(label);
	var labelSpanElem = document.createElement('span');
	labelSpanElem.classList.add('posted_by');
	var labelSpanElemText = document.createTextNode(title + ' ');
	labelSpanElem.appendChild(labelSpanElemText);
	labelDivElem.appendChild(labelSpanElem);
	newPostBodyElem.appendChild(labelDivElem);
  }
  
  var newPostBodyElemText = document.createTextNode(text);
  labelDivElem.appendChild(newPostBodyElemText);

  return newPostBodyElem;
}

function createNewPostBodyEmbed(embed){
  
  var newPostBodyElem = document.createElement('div');
  newPostBodyElem.innerHTML = embed;
  return newPostBodyElem;
}
/*
 * This function creates a new <section> element for a post given all the
 * possible things that could go into the post.
 */
function createNewPostSection(song_name, artist_name, description, user_name, embed) {

  // Create a new post section element.
  var newPostSection = document.createElement('section');
  newPostSection.classList.add('post');

  // Start the body of the new post element.
  var newPostBody = document.createElement('div');
  newPostBody.classList.add('post-body');


  var postBodySongName = createNewPostBodyElem('Song Name', 'song_name', song_name);
  newPostBody.appendChild(postBodySongName);
  
  var postBodyArtistName = createNewPostBodyElem('Artist Name', 'artist_name', artist_name);
  newPostBody.appendChild(postBodyArtistName);
  
  if (description) {
    var postBodyDescription = createNewPostBodyElem('Description', 'description', description);
	  newPostBody.appendChild(postBodyDescription);
  }
  
  var postBodyUserName = createNewPostBodyUserName('Posted by', 'user_name', user_name);
  newPostBody.appendChild(postBodyUserName);

  var postSongEmbed = createNewPostBodyEmbed(embed);
  newPostBody.appendChild(postSongEmbed);



  // Add the body.
  newPostSection.insertBefore(newPostBody, newPostSection.firstChild);

  return newPostSection;

}

/*
 * This function inserts a new todo note based on the values specified in the
 * add note modal when the modal accept button is clicked.
 */
function insertNewPost() {

  // Grab the values from all the input fields.
  var postInputSongName = document.getElementById('post-input-song-name').value;
  var postInputArtistName = document.getElementById('post-input-artist').value;
  var postInputDescription = document.getElementById('post-input-description').value;
  var postInputUserName = document.getElementById('post-input-username').value;
  var postInputEmbed = document.getElementById('post-input-file').value;


  // We only add the note if we have a value for required fields
  if (postInputSongName && postInputArtistName && postInputUserName) {

    // Create a new todo section and append it to the main element.
    var newPostSection = createNewPostSection(
      postInputSongName,
      postInputArtistName,
      postInputDescription,
      postInputUserName,
      postInputEmbed
    );
    var mainElement = document.querySelector('main');
    mainElement.insertBefore(newPostSection, mainElement.firstChild);

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
