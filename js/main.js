jQuery(function($) {



	var phases = new window.azpower.views.PhaseListView({
		el: $('#phase-list'),
		collection: new window.azpower.collections.PhaseCollection()
	});

	var stories = new window.azpower.views.StoryListView({
		el: $('#story-list'),
		collection: new window.azpower.collections.StoryCollection()
	});

	var tags = new window.azpower.views.TagListView({
		el: $('#tag-list'),
		collection: new window.azpower.collections.TagCollection()
	});

});