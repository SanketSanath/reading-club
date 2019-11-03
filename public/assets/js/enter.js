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
		$(this).prop("disabled",true)
		var name = $('#registerName').val().trim()
		var username = $('#registerUsername').val().trim().toLowerCase()
		var password = $('#registerPassword').val().trim()
		var usernameRegex = /^[a-zA-Z0-9]+$/;

		if(username.match(usernameRegex) == null){
			alert('username is not valid. Only characters A-Z, a-z and 0-9 are acceptable.')
			$("#registerUsername").focus()
			$(this).prop("disabled",false)
			return false
		}

		$.ajax({
			type: 'POST',
			url: '/register',
			data: {name, username, password},
			success : function(data, textStatus, xhr){
		        //do something with data
		        window.location = "/"
		    },
		    complete: function(xhr, textStatus) {
		    	console.log(xhr.status)
		    	if(xhr.status === 409){
		    		alert('username already exists')
		    		$('#signin').prop("disabled",false)
		    	}
		    }

		})
		return false
	})

	// login
	$('#login').click(function(e){
		e.preventDefault()
		$(this).prop("disabled",true)

		var username = $('#loginUsername').val().trim().toLowerCase()
		var password = $('#loginPassword').val()

		$.ajax({
			type: 'POST',
			url: '/login',
			data: {username, password},
			success : function(data){
				window.location = "/"
			},
			complete: function(xhr, textStatus){
				console.log(xhr.status)
				if(xhr.status === 404){
					alert('username doesn\'t exist')
					$('#login').prop("disabled",false)
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