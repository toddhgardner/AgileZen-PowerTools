window.azpower.views.PhaseListView = Backbone.View.extend({

	initialize: function () {
		this.$el.html('loading...');
		this.collection.on('reset', this.render, this);
		this.collection.fetch();
	},

	render: function () {
		this.$el.html('<h2>Phases</h2>');
		this.$el.append('<ul>');

		this.collection.each(function (phaseModel) {
			this.$el.append('<li><span>' + phaseModel.get('id') + '</span>-<span>'+phaseModel.get('name')+'</span></li>');
		}, this);

		this.$el.append('</ul>');
	}

});