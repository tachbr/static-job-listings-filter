$('.tags').on('click', displayPanel);
$('.clear').on('click', clearPanel);

let selectors = [];



function SearchItem(keyName, value) {
  this.keyName = keyName;
  this.value = value;
}



function displayPanel(event) {
  $('.selection').addClass('show-selection');
  const data = event.target.dataset;

  let keyName;
  for (let key in data) {
    keyName = key;
  }
  const value = data[keyName];
  const newSearch = new SearchItem(keyName, value);

  if (!searchSelectors(newSearch)) {
    selectors.push(newSearch);
    createTag(newSearch);
    filter(newSearch);
  }
}


function searchSelectors(searchObject){
  let match = false;

  if (selectors.length > 0){
    selectors.forEach(item => {
      if (item.keyName == searchObject.keyName && item.value == searchObject.value) {
        match = true;
      }
    });
  }
  return match;
}



function clearPanel() {
  $('.selection').removeClass('show-selection');
  $('.selection-container').empty();
  $('.listing').removeClass('inactive');
  selectors = [];
}




function createTag(searchObject) {

  let outerDiv = $('<div></div>').addClass('outer-div').attr('id', searchObject.value);

  let div = $('<div></div>').text(searchObject.value);
  div.addClass('selection-tags');

  outerDiv.append(div);

  let imgDiv = $('<div></div>').addClass('img-div');
  let icon = $('<img>').attr('src', 'images/icon-remove.svg').addClass('remove-icon');
  imgDiv.append(icon);

  outerDiv.append(imgDiv);

  $('.selection-container').append(outerDiv);
  icon.on('click', function() {
    clearfilter(searchObject);
  });
}




function filter(searchObject) {
  const filterString = '[data-' + searchObject.keyName + '="' + searchObject.value +'"]';
  console.log(filterString);

  $('.listing').not(':has(' + filterString + ')').addClass('inactive');
}




function clearfilter(searchObject) {
  // const filterString = '[data-' + searchObject.keyName + '="' + searchObject.value +'"]';
  // $('.listing').not(':has(' + filterString + ')').removeClass('inactive');
  $('#' + searchObject.value).remove();
  selectors.forEach(item => {
    if (item.keyName == searchObject.keyName && item.value == searchObject.value) {
      const itemIndex = selectors.indexOf(item);
      selectors.splice(itemIndex, 1);
    }
  })
  refreshPanel();

}

function refreshPanel() {
  $('.listing').removeClass('inactive');
  selectors.forEach(item => {
    filter(item);
  })
}
