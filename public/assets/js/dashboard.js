$(document).ready(function(){

	$('#dashboard_active').addClass('active')
	$('#me_active').removeClass('active')
	$('#friend_active').removeClass('active')

	// update daily activity
	$("#du-btn-0").click(function(e){
		e.preventDefault()
		console.log('start updating.')
		var book_name = ""
		var pages = 0
		var feeling = ""

		$("#du-form-0").hide()
		$("#du-form-1").show()
		$("#du-cancel").show()

		$("#du-btn-1").click(function(e){
			e.preventDefault()
			book_name = $("#du-in-1").val().trim()

			if(book_name !== ""){
				$("#du-form-1").hide()
				$('#du-form-2').show()
				$("#du-in-1-pre").text(book_name)
			}
		})

		$("#du-btn-2").click(function(e){
			e.preventDefault()
			pages = $("#du-in-2").val().trim()

			if(pages !== "" && !isNaN(pages)){
				$("#du-form-2").hide()
				$('#du-form-3').show()
				$("#du-in-2-pre").text(pages)
			}
		})

		$("#du-btn-3").click(function(e){
			e.preventDefault()
			feeling = $("#du-in-3").val().trim()

			if(feeling !== ""){
				$("#du-form-3").hide()
				$('#du-form-4').show()
				$("#du-in-3-pre").text(feeling)
			}
		})

		$("#du-btn-4").click(function(e){
			e.preventDefault()
			var options = { month: 'short', day: '2-digit' }
			var today  = new Date()
			date = today.toLocaleDateString("en-US", options)
			$(this).prop("disabled",true)

			$.ajax({
				type: 'POST',
				url: '/update_daily',
				data: {book_name, pages, feeling, date},
				success: function(data, textStatus, xhr){
					alert('updated!')
					// window.location = '/dashboard'
					location.reload()
				},
				error: function(error) {	
					console.log(error)
					alert(error.responseText)
				}
			})
		})

		$("#du-btn-cancel").click(function(e){
			e.preventDefault()
			$("#du-form-0").show()
			$("#du-form-1").hide()
			$("#du-form-2").hide()
			$("#du-form-3").hide()
			$("#du-form-4").hide()
			$("#du-cancel").hide()
		})


		// prevent submit on enter
		$('.du-form').on('keyup keypress', function(e) {
			var keyCode = e.keyCode || e.which;
			if (keyCode === 13) { 
			e.preventDefault();
			return false;
		}
});
	})

	// find friend
	
})