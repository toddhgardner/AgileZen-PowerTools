window.azpower.collections.PhaseCollection = Backbone.Collection.extend({
	
	url: 'https://agilezen.com/api/v1/projects/'+window.azpower.identity.project+'/phases?apikey='+window.azpower.identity.apiKey+'&pageSize=10000',

	parse: function (response) {
		return response.items;
	}
});