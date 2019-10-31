$(document).ready(function(){

	$('#me_active').addClass('active')
	$('#dashboard_active').removeClass('active')
	$('#friend_active').removeClass('active')

	$("#add-book").click(function(e){
		e.preventDefault()
		$(this).prop("disabled",true)
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
		$(this).prop("disabled",true)
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

	
})