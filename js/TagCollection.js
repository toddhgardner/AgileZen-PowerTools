window.azpower.collections.TagCollection = Backbone.Collection.extend({
	
	url: 'https://agilezen.com/api/v1/projects/'+window.azpower.identity.project+'/tags?apiKey='+window.azpower.identity.apiKey+'',

	fetch: function () {
		var options = {
			data: {
				pageSize: '1000'
			}
		};
		return Backbone.Collection.prototype.fetch.call(this, options);
	},

	parse: function (response) {
		return response.items;
	}

});