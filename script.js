// Variables
var titleInput = $('.js-title');
var bodyInput = $('.js-body');
var submit = $('.js-submit');
var search = $('.js-search');
var ideaList = $('.js-idea-container');
var qualities = [': swill', ': plausible', ': genius'];
var ideaCollection = [];

// Event Listeners
titleInput.on('keyup', enableSave);
bodyInput.on('keyup', enableSave);
submit.on('click', checkInputs);
ideaList.on('click', checkTarget);
search.on('input', searchSort);

// Functions
// Header Section
function enableSave() {
  var isDisabled = (!titleInput || !bodyInput);
  submit.prop('disabled', isDisabled);
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
  // var titleData = titleInput.dataset.title;
  // console.log(`This is the title: ${titleData}`);
  var ideaTitle = titleInput.val().trim();
  var ideaBody = bodyInput.val().trim();
  populateIdea(ideaTitle, ideaBody);
  clearInputs();
  submit.prop('disabled', true);
  enableSearch();
};

// Main Section

function populateIdea(ideaTitle, ideaBody) {

  var index = ideaCollection.length;
  var newArticle =
    `<article class="js-idea" data-id="${index}">
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
  console.log("ideaCollection length:" + ideaCollection.length);
  ideaList.prepend(newArticle);

  //stringify the new article to be placed in local storage
  //set the newly created article in local storage
  localStorage.setItem(`article-${index}`, JSON.stringify(newArticle));
  


};

function enableSearch(){
  var isDisabled = (!ideaCollection);
  search.prop('disabled', isDisabled);
}

function searchSort(){
  var filteredIdeas = ideaCollection.filter(function(idea){
    var terms = search.val();
    //If the idea article contains anything matching the terms, 
    //then it should be included in the newly created filterIdeas array
    //Use the new array to populate the ideaList
    $(`article:contains(${terms})`);


  });
  console.log(filteredIdeas);

  // var ideaArray = ideaList.makeArray();
}


function checkTarget(event) {
  if (event.target.className === 'delete-button') {
    $(event.target).closest('article').remove();

    //GET HALP:
    // if (ideaCollection.length === 0){
    //   search.prop('disabled', true);
    // }
    

  } else if (event.target.className === 'upvote-button') {
    var currQuality = $(event.target).nextAll('h4').children().text();
    upQuality(event, currQuality);
  } else if (event.target.className === 'downvote-button') {
    var currQuality = $(event.target).nextAll('h4').children().text();
    downQuality(event, currQuality);
  };
};



function upQuality(event, currQuality) {

    for (i = 0; i < qualities.length; i++) {
      if (qualities[i] === currQuality) {
        $(event.target).nextAll('h4').children().text(qualities[i + 1]);
      }
  }

  // qualities.forEach(function(quality){

  //   if(quality === currQuality){
  //     $(event.target).nextAll('h4').children().text(qualities[(quality.indexOf())+1]);
  //   }
  // });


}

function downQuality(event, currQuality) {
  for (i = 0; i < qualities.length; i++) {
    if (qualities[i] === currQuality) {
      $(event.target).nextAll('h4').children().text(qualities[i - 1]);
    }
  }
}
// window.localStorage

// localStorage.setItem();

// localStorage.remoteItem();