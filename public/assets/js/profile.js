$(document).ready(function(){

	$('#dashboard_active').removeClass('active')
	$('me_active').removeClass('active')
	$('friend_active').removeClass('active')

	$("#add_friend").click(function(e){
		e.preventDefault()
		$(this).prop("disabled",true)
		var id = $(this).val()
		console.log('this is id: '+id)

		$.ajax({
			type: 'POST',
			url: '/add_friend',
			data: {id},
			success: function(data, textStatus, xhr){
				alert('added as friend')
				location.reload()
			},
			complete: function(xhr, textStatus){
				if(xhr.status === 415){
					alert('incomplete data')
				}
			}
		})
	})

})