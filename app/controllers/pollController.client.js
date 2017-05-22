'use strict';

/*Client site controller
The client-side controller will be responsible for retrieving information from the API,
and making it available within the view. 
Additionally, it will specify what action should be taken when one of the two buttons are clicked.
*/


(function () {

   //VAR
   var poll = document.querySelector('#poll');
   var addButton = document.querySelector('#addpoll');
   var deleteButton = document.querySelector('#delpoll');
   var pollList = document.querySelector('#polllist');
   var apiUrl = appUrl + '/api/:id/polls';

   //FUNCTIONS
   function updatePoll (data) {
      //var pollObject = JSON.parse(data);
      var pollArray = data;
      pollList.innerHTML = '';
      for(var a = 0; a < pollArray.length; a++){
         pollList.innerHTML = pollList.innerHTML +'<li>'+pollArray[a]+'</li>';
      }
      
   }

   //EXE
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll));

   //LISTENERS
   addButton.addEventListener('poll', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl+'/add/'+poll, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll);
      });

   }, false);

   deleteButton.addEventListener('poll', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll);
      });

   }, false);

})();
