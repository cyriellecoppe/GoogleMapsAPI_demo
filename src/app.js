'use strict'

import '../node_modules/slick-carousel/slick/slick.css'
import '../node_modules/slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.css'
import './css/main.scss'
import 'bootstrap'

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import Header from './js/Header.jsx'
import MapContainer from './js/MapContainer.jsx'


class App extends React.Component {

    componentDidMount() {
        $('#index__animation--loading').css('display', 'none')
        $('#index__animation--text').css('display', 'none')
    }

    render() {
        return (
            <div>
                <Header />
                <MapContainer />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'))
