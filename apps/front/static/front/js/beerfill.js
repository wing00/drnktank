  
  $(document).ready(function() {
  $('.pour') //Pour Me Another Drink, Bartender!
    .delay(1000)
    .animate({
      height: '360px'
      }, 1500)
    .delay(1600)
    .slideUp(500);
  
  $('.liquid') // I Said Fill 'Er Up!
    .delay(2400)
    .animate({
      height: '170px'
    }, 2500);

  $('.beer-foam') // Keep that Foam Rollin' Toward the Top! Yahooo!
    .delay(2400)
    .animate({
      bottom: '200px'
      }, 2500);
  });
