$(document).ready(function(){

	$("#add_friend").click(function(e){
		e.preventDefault()
		var id = $(this).val()
		console.log('this is id: '+id)

		$.ajax({
			type: 'POST',
			url: '/add_friend',
			data: {id},
			success: function(data, textStatus, xhr){
				alert('added as friend')
			},
			complete: function(xhr, textStatus){
				if(xhr.status === 415){
					alert('incomplete data')
				}
			}
		})
	})

})