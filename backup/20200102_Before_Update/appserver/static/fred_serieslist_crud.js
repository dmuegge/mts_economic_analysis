require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc) {

    

	var tokens = mvc.Components.get('submitted');
	/* --- Search Reference --- */
	var updateSearch = mvc.Components.get('updateSearch');
	var createSearch = mvc.Components.get('createSearch');
	var deleteSearch = mvc.Components.get('deleteSearch');
	var serieslistDisplaySearch = mvc.Components.get('serieslistDisplaySearch');
	
	/* --- Table Reference --- */
	var serieslistDisplayTable = mvc.Components.get('serieslistDisplayTable');
	
	/* --- Define the form inputs --- */
	var fredid_Input = $('[name="FredID"]');
	var name_Input = $('[name="Name"]');
	var description_Input = $('[name="Description"]');
	var frequency_Input = $('[name="Frequency"]');
	var category_Input = $('[name="Category"]');
	var url_Input = $('[name="URL"]');
	var _key_Input = $('[name="_key"]')
	
	/* --- Reference to the input values --- */
	var fredid_Val, name_Val, description_Val, frequency_Val, category_Val, url_Val, _key_Val;
	

    serieslistDisplayTable.on('click', function(e) {


       e.preventDefault();
       console.log('e: ', e);
	   
	   
		if(e['field'] === 'Update') { 
		
			/* --- Pull values from the current table row --- */
			fredid_Val = e.data['row.FredID'];
			name_Val = e.data['row.Name'];
			description_Val = e.data['row.Description'];
			frequency_Val = e.data['row.Frequency'];
			category_Val = e.data['row.Category'];
			url_Val = e.data['row.URL'];
			_key_Val = e.data['row._key'];
			 
			 
			/* --- Insert values from rows into input fields --- */
			fredid_Input.val(fredid_Val);
			name_Input.val(name_Val);
			description_Input.val(description_Val);
			frequency_Input.val(frequency_Val);
			category_Input.val(category_Val);
			url_Input.val(url_Val);
			_key_Input.val(_key_Val);

			$('form *').filter(':input').each(function(){
			   var value = $(this).val();
			   console.log(value);
			});
			
		} else if(e['field'] === 'Delete') {


			tokens.set('delete_key_tok', e.data['row._key']);


		}
		
    });

	$(document).on('click', '#submitButton', function(e) {
	
	
		e.preventDefault();
		if(_key_Input.val() != '') {
			/* --- this is an update --- */
			tokens.set('update_key_tok', _key_Val);
			tokens.set('update_fredid_tok', fredid_Input.val());
			tokens.set('update_name_tok', name_Input.val());
			tokens.set('update_description_tok', description_Input.val());
			tokens.set('update_frequency_tok', frequency_Input.val());
			tokens.set('update_category_tok', category_Input.val());
			tokens.set('update_url_tok', url_Input.val());
			
		} else {
			  /* --- this is new so create --- */
			tokens.set('create_tok', 'true');
			tokens.set('create_fredid_tok', fredid_Input.val());
			tokens.set('create_name_tok', name_Input.val());
			tokens.set('create_description_tok', description_Input.val());
			tokens.set('create_frequency_tok', frequency_Input.val());
			tokens.set('create_category_tok', category_Input.val());
			tokens.set('create_url_tok', url_Input.val());
		} 
		
		
		
		console.log('e: ', e);
		
	});
	
	/* --- Search Jobs --- */
	updateSearch.on('search:done', function() {


		serieslistDisplaySearch.startSearch();
		$('form *').filter(':input').each(function(){
			$(this).val('');
		});


	});
	
	createSearch.on('search:done', function() {


        serieslistDisplaySearch.startSearch();


        $('form *').filter(':input').each(function(){
            $(this).val('');
        });


    });
	
	
	deleteSearch.on('search:done', function() {


		serieslistDisplaySearch.startSearch();


		tokens.unset('delete_key_tok');


	});
	
	
});


