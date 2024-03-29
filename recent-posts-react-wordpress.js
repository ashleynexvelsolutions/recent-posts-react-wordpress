/*This code will generate a list of the 3 most recent WordPress posts title, featured image, excerpt, author avatar, author, and link to post. In index.html you must include <div id="app"></div>.*/
import React, { render } from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class'
import axios from 'axios';
var App = createReactClass({

	getInitialState: function() {
		return {
			posts: []
		}
	},

	componentDidMount: function() {
		var th = this;
		this.serverRequest =
		axios.get(this.props.source)
			.then(function(result) {
				th.setState({
				posts: result.data
			});
		})
	},

	componentWillUnmount: function() {
		this.serverRequest.abort();
	},

	render: function() {
		return (
			<div className="post-wrapper">
			{this.state.posts.map(function(post) {
				return (
					<div key={post.link} className="post">
						<h2 className="post-title"><a href={post.link}
						dangerouslySetInnerHTML={{__html:post.title.rendered}}
						/></h2>
						{post.featured_media ?
							<a href={post.link}><img src={post._embedded['wp:featuredmedia'][0].source_url} /></a>
						: null}
						{post.excerpt.rendered ?
							<div className="excerpt" dangerouslySetInnerHTML={{__html:post.excerpt.rendered}} />
						: null}
						<div className="entry-meta">
							<a className="author-wrap" href={post._embedded.author[0].link}><img className="avatar" src={post._embedded.author[0].avatar_urls['48']} />by&nbsp; {post._embedded.author[0].name}</a>
							<a className="button read-more" href={post.link}>Read More &raquo;</a>
						</div>
					</div>
				);
			})}
			</div>
		)
	}

});

ReactDOM.render(<App source="https://wordpress-195297-1022048.cloudwaysapps.com/wp-json/wp/v2/posts/?_embed&per_page=3&" />, document.querySelector("#app"));

export default App