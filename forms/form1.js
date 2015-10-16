
jQuery(document).ready(function($) {

	$(".default").each(function(){
		var defaultVal = $(this).attr('title');
		$(this).focus(function(){
			if ($(this).val() == defaultVal){
				$(this).removeClass('active').val('');
			}
		});
		$(this).blur(function() {
			if ($(this).val() == ''){
				$(this).addClass('active').val(defaultVal);
			}
		})
		.blur().addClass('active');
	});
	$('.btn-submit').click(function(e){
		var $formId = $(this).parents('form');
		var formAction = $formId.attr('action');
		defaulttextRemove();
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var phoneReg = /^(0)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;
		var nameReg=/^[a-öA-Ö]{1,40}$/;
		$('li',$formId).removeClass('error');
		$('span.error').remove();
		$('.required',$formId).each(function(){
			var inputVal = $(this).val();
			var $parentTag = $(this).parent();
		 
	if(!inputVal == ''){
             
            		if($(this).hasClass('email') == true){
				if(!emailReg.test(inputVal)){
					$parentTag.addClass('error').append('<span class="error">En giltlig email adress måste anges.</span>');
			    }else if(emailReg.test(inputVal)){
				     $parentTag.removeClass('error').addClass('valid');
				}
			}
			
			if($(this).hasClass('fname') == true){
				if(!nameReg.test(inputVal)){
					$parentTag.removeClass('valid').addClass('error').append('<span class="error">Ett giltlig namn måste anges.</span>');
				}else if(nameReg.test(inputVal)){
				    $parentTag.removeClass('error').addClass('valid');
	
				}
			}
				if($(this).hasClass('kname') == true){
				if(!nameReg.test(inputVal)){
					$parentTag.removeClass('valid').addClass('error').append('<span class="error">Ett giltlig namn måste anges.</span>');
				}else if(nameReg.test(inputVal)){
				    $parentTag.removeClass('error').addClass('valid');
	
				}
			}
			if($(this).hasClass('phone') == true){
				if(!phoneReg.test(inputVal)){
					$parentTag.addClass('error').append('<span class="error">Ett mobilnummer måste anges.</span>');
			    }else if(phoneReg.test(inputVal)){
				     $parentTag.removeClass('error').addClass('valid');
				}
			}
	}else{
	    			$parentTag.removeClass('valid').addClass('error').append('<span class="error">Vänligen fyll i fältet</span>');
		
	}		
		});
		if ($('span.error').length == "0") {
		
			$('fieldset',$formId).hide();
			$.post(formAction, $formId.serialize(),function(data){
		
				$formId.append(data).fadeIn();
			});
		}
		e.preventDefault();
	});
});
function defaulttextRemove(){
	$('.default').each(function(){
		var defaultVal = $(this).attr('title');
		if ($(this).val() == defaultVal){
			$(this).val('');
		}
	});
}

