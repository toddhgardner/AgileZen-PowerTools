window.azpower.collections.StoryCollection = Backbone.Collection.extend({
	
	_phaseId: 0,

	url: function () {
		if (this._phaseId != 0) {
			return 'https://agilezen.com/api/v1/projects/'+window.azpower.identity.project+'/phases/'+this._phaseId+'/stories?apikey='+window.azpower.identity.apiKey+'&pageSize=10000'
		} 
		return 'https://agilezen.com/api/v1/projects/'+window.azpower.identity.project+'/stories?apikey='+window.azpower.identity.apiKey+'&pageSize=10000'
	},

	setPhase: function(phaseId) {
		this._phaseId = phaseId;
	},

	fixEstimates: function () {
		this.each(function (story) {
			var size = story.get('size');
			var devSize, qaSize, doStuff;

			if (size) {
				if (size.indexOf('-') !== 0) {
					devSize = parseInt($.trim(size.split('-')[0]));
					qaSize = parseInt($.trim(size.split('-')[1]));
					doStuff = true;
				} else if (size.indexOf('/') !== 0) {
					devSize = parseInt($.trim(size.split('/')[0]));
					qaSize = parseInt($.trim(size.split('/')[1]));
					doStuff = true;
				}
			}

			if (devSize) {
				story.set('size', devSize);
			}

			if (qaSize) {
				story.set('priority', qaSize);
			}

			if (doStuff) {
				Backbone.sync('update', story, { 
					url: 'https://agilezen.com/api/v1/projects/'+window.azpower.identity.project+'/stories/'+story.get('id')+'?apikey='+window.azpower.identity.apiKey
				});
			}
		});
	},

	moveAll: function (phaseId) {
		// Stupid AgileZen doesn't support multiple posts on this endpoint :P
		this.each(function (story) {
			story.set({	phase: parseInt(phaseId) });
			Backbone.sync('update', story, { 
				url: 'https://agilezen.com/api/v1/projects/'+window.azpower.identity.project+'/stories/'+story.get('id')+'?apikey='+window.azpower.identity.apiKey
			});
		});
	},

	tagAll: function (tagId) {
		// Stupid AgileZen doesn't support multiple posts on this endpoint :P
		var url = 'https://agilezen.com/api/v1/projects/'+window.azpower.identity.project+'/tags/'+tagId+'/stories?apikey='+window.azpower.identity.apiKey+'';
		this.each(function (story) {
			Backbone.sync('create', story, { url: url });
		});
	},

	parse: function (response) {
		return response.items;
	}
});