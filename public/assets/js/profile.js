$(document).ready(function(){

	$('#dashboard_active').removeClass('active')
	$('me_active').removeClass('active')
	$('friend_active').removeClass('active')

	$("#follow-btn").click(function(e){
		e.preventDefault()
		$(this).prop("disabled",true)
		var id = $(this).val()
		console.log('this is id: '+id)

		$.ajax({
			type: 'POST',
			url: '/follow_user',
			data: {id},
			success: function(data, textStatus, xhr){
				alert('Now following')
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