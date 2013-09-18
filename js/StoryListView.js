window.azpower.views.StoryListView = Backbone.View.extend({
	
	events: {
		'click #fix-estimates': 'onFixEstimates',
		'click #tag-all': 'onTagAll',
		'click #move-all': 'onMoveAll',
		'click #filter-phase': 'onFilterPhase'
	},

	initialize: function () {
		this.$el.html('loading...');
		this.collection.on('reset', this.render, this);
		this.collection.fetch();
	},

	render: function () {
		this.$el.html('<h2>Stories</h2>');
		this.$el.append('<button id="fix-estimates">fix estimates</button>');
		this.$el.append('<input id="phase-id" /><button id="filter-phase">filter by phase</button>');
		this.$el.append('<input id="tag-id" /><button id="tag-all">tag all</button>');
		this.$el.append('<input id="move-phase-id" /><button id="move-all">move all</button>');
		this.$el.append('<ul>');

		this.collection.each(function (storyModel) {
			this.$el.append('<li>' + storyModel.get('text') + '</li>');
		}, this);

		this.$el.append('</ul>');
	},

	onFixEstimates: function () {
		this.collection.fixEstimates();
	},

	onFilterPhase: function () {
		var phaseId = this.$('#phase-id').val();
		if (!phaseId) phaseId = 0;
		this.collection.setPhase(phaseId);
		this.collection.fetch();
	},

	onTagAll: function () {
		var tagId = this.$('#tag-id').val();
		this.collection.tagAll(tagId);
	},

	onMoveAll: function () {
		var phaseId = this.$('#move-phase-id').val();
		this.collection.moveAll(phaseId);
	}

});