// window.localStorage

// localStorage.setItem();

// localStorage.remoteItem();


var titleInput = $('.js-title');
var bodyInput = $('js-body');
var submit = $('.js-submit');
var search = $('.js-search').val();


titleInput.on('keyup', enableSave);

bodyInput.on('keyup', enableSave);

submit.on('click', function(e){
	e.preventDefault();

	var titleData = titleInput.dataset.title;

	return `This is the title: ${titleData}`;
});


function enableSave() {
  var isDisabled = (!titleInput || !bodyInput);

  submit.prop('disabled', isDisabled);
  return "It works";

}



