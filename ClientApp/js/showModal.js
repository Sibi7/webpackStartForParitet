function showModal(dopClass) {

   var main = document.querySelector('.modal');
   if (main) {
       if (dopClass === undefined) {
           $(main.parentNode).fadeIn();
       } else {
           main = document.querySelector('.modal' + '.' + dopClass.replace('.', ''));
           $(main.parentNode).fadeIn();
       }
   } else {
       return false
   }
    return false
}
