$(document).ready(function(){

	// toggle login and signup form
	$('.toggle-enter').click(function(e){
		e.preventDefault()
		$('#login-block').toggle()
		$('#register-block').toggle()
	})

	// register
	$('#signin').click(function(e){
		e.preventDefault()
		var name = $('#registerName').val()
		var username = $('#registerUsername').val()
		var password = $('#registerPassword').val()
		
		$.ajax({
			type: 'POST',
			url: '/register',
			data: {name, username, password},
			success : function(data, textStatus, xhr){
		        //do something with data
		        window.location = "/me"
		    },
		    complete: function(xhr, textStatus) {
		    	console.log(xhr.status)
		    	if(xhr.status === 409){
		    		alert('username already exists')
		    	}
		    }

		})
		return false
	})

	// login
	$('#login').click(function(e){
		e.preventDefault()
		var username = $('#loginUsername').val()
		var password = $('#loginPassword').val()

		$.ajax({
			type: 'POST',
			url: '/login',
			data: {username, password},
			success : function(data){
				window.location = "/me"
			},
			complete: function(xhr, textStatus){
				console.log(xhr.status)
				if(xhr.status === 404){
					alert('username doesn\'t exists')
				} else if(xhr.status === 401) {
					alert('incorrect password')
				} else if(xhr.status !== 200) {
					alert('some error occured. Please try after some time')
				}
			}
		})
		return false
	})

})