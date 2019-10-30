$(document).ready(function(){

	$("#add-book").click(function(e){
		e.preventDefault()
		var book_name = $("#book-name").val()
		var author = $('#book-author').val()

		$.ajax({
			type: 'POST',
			url: '/add_book',
			data: {book_name, author},
			success: function(data, textStatus, xhr){
				// window.location = "/"
				location.reload()
			},
			complete: function(xhr, textStatus){
				if(xhr.status === 415){
					alert('incomplete data')
				}
			}
		})
	})

	$(".book-delete").click(function(e){
		e.preventDefault()
		var book_id = $(this).val()
		var result = confirm("Want to delete?");
		if (result) {
			$.ajax({
				type: 'DELETE',
				url: '/delete_book',
				data: {book_id},
				success: function(data, textStatus, xhr){
					console.log('success mil gaya')
					// window.location = "/dashboard"
					location.reload()
				}
			})
		}

	})

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
			book_name = $("#du-in-1").val()
			console.log(book_name)
			if(book_name !== ""){
				$("#du-form-1").hide()
				$('#du-form-2').show()
				$("#du-in-1-pre").text(book_name)
			}
		})

		$("#du-btn-2").click(function(e){
			e.preventDefault()
			pages = $("#du-in-2").val()

			if(pages !== "" && !isNaN(pages)){
				$("#du-form-2").hide()
				$('#du-form-3').show()
				$("#du-in-2-pre").text(pages)
			}
		})

		$("#du-btn-3").click(function(e){
			e.preventDefault()
			feeling = $("#du-in-3").val()

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
	})

	// find friend
	
})