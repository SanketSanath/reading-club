$(document).ready(function(){

	$('#me_active').addClass('active')
	$('#dashboard_active').removeClass('active')
	$('#friend_active').removeClass('active')
	$('#contact_active').removeClass('active')

	var book_rating = 0

	var star = $('#rating i')
	for(var i = 0; i < star.length; i++){
		console.log(star[i])
		star[i].addEventListener("click",function(){
			book_rating = this.getAttribute("value")
			console.log(book_rating)
			clearClass()

			for(var j=book_rating-1;j>=0;j--){
				star[j].classList.toggle('fas');
			}

			for(var j=book_rating;j < star.length; j++){
				star[j].classList.toggle('far');
			}
		})
	}

	$("#add-book").click(function(e){
		e.preventDefault()
		$(this).prop("disabled",true)
		var b_name = $("#book-name").val().trim()
		var author = $('#book-author').val().trim()
		var review = $('#b-review').val().trim()

		console.log('rating: '+book_rating)
		console.log('review: '+review)

		$.ajax({
			type: 'POST',
			url: '/add_book',
			data: {b_name, author, book_rating, review},
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


function clearClass(){
  var star = $('#rating i')
  for(var i=0;i<star.length;i++){
      //console.log(x[i].classList);
      star[i].classList.remove('far')
      star[i].classList.remove('fas')
  };
}