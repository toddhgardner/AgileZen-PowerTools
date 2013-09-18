window.azpower.views.TagListView = Backbone.View.extend({
	
	events: {
		'click #create-tag': 'onCreateTags'
	},

	initialize: function () {
		this.$el.html('loading...');
		this.collection.on('reset', this.render, this);
		this.collection.on('add', this.render, this);
		this.collection.fetch();
	},

	render: function () {
		this.$el.html('<h2>Tags</h2>');
		this.$el.append('<input id="tag-name">');
		this.$el.append('<button id="create-tag">Create</button>');
		this.$el.append('<ul>');

		this.collection.each(function (tagModel) {
			this.$el.append('<li><span>' + tagModel.get('id') + '</span>-<span>'+tagModel.get('name')+'</span></li>');
		}, this);

		this.$el.append('</ul>');
	},

	onCreateTags: function () {
		var name = this.$('#tag-name').val();
		this.collection.create({ name: name });
	}

});