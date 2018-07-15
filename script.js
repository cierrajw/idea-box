// Variables
var titleInput = $('.js-title');
var bodyInput = $('.js-body');
var submit = $('.js-submit');
var search = $('.js-search');
var ideaList = $('.js-idea-container');
var qualities = [': swill', ': plausible', ': genius'];

// Event Listeners
titleInput.on('keyup', enableSave);
bodyInput.on('keyup', enableSave);
submit.on('click', checkInputs);
ideaList.on('click', checkTarget);

// Functions

// Header Section
function enableSave() {
  var isDisabled = (!titleInput || !bodyInput);
  submit.prop('disabled', isDisabled);
};

function checkInputs(event) {
  event.preventDefault();
  if (!titleInput.val() || !bodyInput.val()) {
    alert('Please enter a title and description for your idea.');
    return;
  } else {
    makeCard();
  };
};

function clearInputs() {
  titleInput.val('');
  bodyInput.val('');
};

function makeCard() {
  // var titleData = titleInput.dataset.title;
  // console.log(`This is the title: ${titleData}`);
  var ideaTitle = titleInput.val();
  var ideaBody = bodyInput.val();
  populateIdea(ideaTitle, ideaBody);
  clearInputs();
  submit.prop('disabled', true);
};

// Main Section
function populateIdea(ideaTitle, ideaBody) {
  var ideaCollection = $('js-idea').toArray();
  var index = ideaCollection.length;
  var newArticle =
    `<article class="js-idea">
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
  ideaList.prepend(newArticle);
};

function checkTarget(event) {
  if (event.target.className === 'delete-button') {
    $(event.target).closest('article').remove();
  } else if (event.target.className === 'upvote-button') {
    console.log('Upvote yayyyy');
  } else if (event.target.className === 'downvote-button') {
    console.log('Downvote yayyyy');
  };
};

// window.localStorage

// localStorage.setItem();

// localStorage.remoteItem();