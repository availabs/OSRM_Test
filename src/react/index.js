import React from "react"
import { connect } from 'react-redux'

import Mapboxgl from "./mapboxgl/Mapboxgl.react"
import GeojsonSource from "./mapboxgl/GeojsonSource"
import GeojsonLayer from "./mapboxgl/GeojsonLineLayer"

import { mapClick } from "./actions/mapClick"

const mapStateToProps = state => ({
	mapPoints: state.mapPoints,
	routeGeometry: state.routeGeometry
})
const mapDispatchToProps = dispatch => ({
    onMapClick: coords => dispatch(mapClick(coords))
})

const extractLngLat = onMapClick =>
	e => (console.log(e),onMapClick([e.lngLat.lng, e.lngLat.lat]))

//-113.205717,35.237149/-113.065857,35.291823
class App extends React.Component {
	constructor(props) {
		super(props);

		let source = GeojsonSource(),
			layer = GeojsonLayer()
				.source(source);

		this.state = {
			source,
			layer
		}
	}

	componentWillReceiveProps(newProps) {
		let features = newProps.routeGeometry ?
			[{
				geometry: newProps.routeGeometry,
				type: "Feature",
				properties: {}
			}]
			: [];
		this.state.source.features(features);
	}

	render() {
		const height = `${ window.innerHeight - 16 }px`;
		return (
			<div style={ { height } }>
				<Mapboxgl onClick={ extractLngLat(this.props.onMapClick) }
					sources={ [this.state.source] }
					layers={ [this.state.layer] }/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)