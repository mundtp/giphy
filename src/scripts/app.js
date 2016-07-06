import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import AppView from './AppView'


const app = function() {

	var GifCollection = Backbone.Collection.extend({
	 url: 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC',
	 _key: 'dc6zaTOxFJmzC',
	 parse: function(rawJSON){
	 return rawJSON.data
	}

	})

	var gifColl = new GifCollection


	const GifRouter = Backbone.Router.extend({
		routes: {
			'search/:query': '_handleSearch',
			'*anything': '_handleSearch'
		},

		initialize: function(){
			Backbone.history.start()
		},

		_handleSearch: function (query){
			gifColl.fetch({
		data: {
			api_key: gifColl._key,
			q: query
		}
	})
			ReactDOM.render(<AppView collection={gifColl}/>, document.querySelector('.container'))
		}

	})

	new GifRouter()
}


app()





