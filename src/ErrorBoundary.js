import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		console.log(error, info)
	}

	render() {
		if (this.state.hasError) {
			return <p>Item could not be displayed.</p>
		}
		return this.props.children;
	}
}

