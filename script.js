// Variables
var titleInput = $('.js-title');
var bodyInput = $('.js-body');
var submit = $('.js-submit');
var search = $('.js-search');
var ideaList = $('.js-idea-container');
var ideaCollection = $('js-idea').toArray();

// Event Listeners
titleInput.on('keyup', enableSave);
bodyInput.on('keyup', enableSave);
submit.on('click', checkInputs);

// Functions
// Header Section

function enableSave() {
  var isDisabled = (!titleInput || !bodyInput);
  submit.prop('disabled', isDisabled);
}

function checkInputs(e) {
  e.preventDefault();
  var isEmpty = (!titleInput || !bodyInput);
  if (isEmpty) {
    alert('Please enter a title and description for your idea.');
  } else {
    makeCard();
  }
}

function makeCard() {
  // var titleData = titleInput.dataset.title;
  // console.log(`This is the title: ${titleData}`);
  var ideaTitle = titleInput.val();
  var ideaBody = bodyInput.val();
  populateIdea(ideaTitle, ideaBody);

}

function populateIdea(ideaTitle, ideaBody) {
  var index = ideaCollection.length;
  var newArticle = `<article class="js-idea">
          <div class="idea-title" id="${index}"">
            <h2>${ideaTitle}</h2>
            <button class="delete-button" aria-label="delete button"></button>
          </div>
          <p>${ideaBody}</p>
          <div class="idea-vote">
            <button class="upvote-button" aria-label="upvote button"></button>
            <button class="downvote-button" aria-label="downvote button"></button>
            <h4>quality<span class="idea-quality">: swill<span></h4>
          </div>
        </article>`;
  ideaCollection.push(newArticle);
  ideaList.append(newArticle);
}

// Main Section
// window.localStorage

// localStorage.setItem();

// localStorage.remoteItem();