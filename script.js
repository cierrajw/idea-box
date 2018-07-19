// Variables
var titleInput = $('.js-title');
var bodyInput = $('.js-body');
var submit = $('.js-submit');
var search = $('.js-search');
var ideaList = $('.js-idea-container');
var qualities = [': swill', ': plausible', ': genius'];

// Event Listeners
$(document).ready(getLocalStorage);
titleInput.on('keyup', enableSave);
bodyInput.on('keyup', enableSave);
submit.on('click', checkInputs);
ideaList.on('click', checkTarget);
ideaList.on('input', resetItem);
search.on('input', searchSort);

// Functions
// Header Section
function enableSave() {
  var isDisabled = (!titleInput || !bodyInput);
  submit.prop('disabled', isDisabled);
};

function getLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var parsedItem = JSON.parse(localStorage.getItem(`idea-${i}`));
    ideaList.prepend(parsedItem);
  };
};

function checkInputs(event) {
  event.preventDefault();
  if (!titleInput.val().trim() || !bodyInput.val().trim()) {
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
  var ideaTitle = titleInput.val().trim();
  var ideaBody = bodyInput.val().trim();
  populateIdea(ideaTitle, ideaBody);
  clearInputs();
  submit.prop('disabled', true);
  enableSearch();
};

// Main Section
function populateIdea(ideaTitle, ideaBody) {
  var index = localStorage.length;
  var newArticle =
    `<article class="js-idea" data-id="${index}">
      <div class="idea-title">
        <h2 contenteditable>${ideaTitle}</h2>
        <button class="delete-button" aria-label="delete button"></button>
      </div>
      <p contenteditable>${ideaBody}</p>
      <div class="idea-vote">
        <button class="upvote-button" aria-label="upvote button"></button>
        <button class="downvote-button" aria-label="downvote button"></button>
        <h4>quality<span class="idea-quality">: swill<span></h4>
      </div>
    </article>`;
  ideaList.prepend(newArticle);
  localStorage.setItem(`idea-${index}`, JSON.stringify(newArticle));
};

function resetItem(event) {
  var card = $(event.target).closest('article');
  var ideaId = card.prop('dataset').id;
  var articleHtml = card.prop('outerHTML');
  localStorage.setItem(`idea-${ideaId}`, JSON.stringify(articleHtml));
};

function enableSearch() {
  var isDisabled = (!localStorage.length);
  search.prop('disabled', isDisabled);
};

function searchSort() {
  var filteredIdeas = ideaCollection.filter(function(idea) {
    var terms = search.val();
    //If the idea article contains anything matching the terms,
    //then it should be included in the newly created filterIdeas array
    //Use the new array to populate the ideaList
    $(`article:contains(${terms})`);
  });
  console.log(filteredIdeas);
};

function checkTarget(event) {
  if (event.target.className === 'delete-button') {
    deleteCard(event);
  } else if (event.target.className === 'upvote-button') {
    var currQuality = $(event.target).nextAll('h4').children().text();
    upQuality(event, currQuality);
  } else if (event.target.className === 'downvote-button') {
    var currQuality = $(event.target).nextAll('h4').children().text();
    downQuality(event, currQuality);
  };
};

function deleteCard(event) {
  var card = $(event.target).closest('article');
  var deletedId = card.prop('dataset').id;
  var nextArticles = card.prevAll();
  card.remove();
  localStorage.removeItem(`idea-${deletedId}`);
  resetIds(nextArticles);
  if (!localStorage.length) {
    clearSearch();
  };
};

function resetIds(nextArticles) {
  nextArticles.each(function() {
    var currentId = parseInt($(this).prop('dataset').id);
    var previousId = currentId - 1;
    $(this).prop('dataset').id = previousId;
    var articleHtml = $(this).prop('outerHTML');
    localStorage.setItem(`idea-${previousId}`, JSON.stringify(articleHtml));
    localStorage.removeItem(`idea-${currentId}`);
  });
};

function clearSearch() {
  search.val('');
  search.prop('disabled', true);
};

function upQuality(event, currQuality) {
  for (var i = 0; i < qualities.length; i++) {
    if (qualities[i] === currQuality) {
      $(event.target).nextAll('h4').children().text(qualities[i + 1]);
    };
  };

  resetItem(event);
};

function downQuality(event, currQuality) {
  for (var i = 0; i < qualities.length; i++) {
    if (qualities[i] === currQuality) {
      $(event.target).nextAll('h4').children().text(qualities[i - 1]);
    };
  };

  resetItem(event);
};