var inputElem = document.querySelector('.chatMessage');
var messages = document.querySelector('.messages');
var xhr = new XMLHttpRequest();
var nextIdx = 0 ;
// making a POST request to a given endpoint

function createHTMLMessage (msg, source){
	var li = document .createElement( "li" );
	var div = document .createElement( "div" );
	div.innerHTML += msg;
	div.className += "messageInstance " + source;
	li.appendChild(div);
	messages.appendChild(li);
}


inputElem.addEventListener( 'keypress' , function (e) {
	//e.preventDefault();
	var key = e.which || e.keyCode;
	if (key === 13 ) {
		doPostRequest( '/newMsg' , {
			msg: inputElem.value,
			nextIdx: nextIdx
		}, onPostResponse);
		//createHTMLMessage(inputElem.value, 'client' );
		inputElem.value = "" ;
	}
});

setTimeout(poll, 500 );

function poll () {
	doPostRequest( '/' , { nextIdx: nextIdx }, onPostResponse);
	setTimeout(poll, 500 );
}

function doPostRequest (endpoint, body, callback) {
	xhr.onreadystatechange = callback;
	xhr.open( 'POST' , endpoint);
	xhr.setRequestHeader( 'Content-Type' , 'application/json' );
	xhr.send( JSON .stringify(body));
}

function onPostResponse () {
// checking response code (success)
if ( this .readyState === 4 && this .status === 200 ) {
	var response = JSON .parse( this .responseText);
	if (response.newMessages.length <= 0 ) {
		return ;
	}
	for ( var i = 0 ; i < response.newMessages.length - 1 ; ++i) {
		createHTMLMessage(response.newMessages[i], 'server' );
	}
	var message = response.newMessages[response.newMessages.length -
	1 ];
	var source = response.isLastClient ? 'client' : 'server' ;
	createHTMLMessage(message, source);
	nextIdx = response.nextIdx;
}
}