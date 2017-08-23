import React from 'react'
import $ from 'jquery'


export default class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        this.clearInput = this.clearInput.bind(this)
        this.handleEnterKey = this.handleEnterKey.bind(this)
    }

    clearInput() {
        $('#search-bar__input').val('')
        this.props.clearAll()
    }

    handleEnterKey(event) {
        if (event.keyCode === 13 || event.code === 'Enter') {
            event.preventDefault()
            this.props.setInput(event.target.value)
        }
    }

    render() {
        return (
            <div className="row">
                <form className="form-inline col-12" id="search-bar__form">
                    <div
                        className="input-group col-md-6 col-sm-6 col-8"
                        id="search-bar"
                    >
                        <input
                            id="search-bar__input"
                            className="form-control"
                            type="text"
                            placeholder="Enter a place, type..."
                            aria-label="search bar"
                            aria-haspopup="true"
                            onKeyDown={this.handleEnterKey}
                            onInput={(e) =>
                                this.props.setFilter(e.target.value)
                            }
                        />
                        <span className="input-group-addon">
                            <i
                                className="fa fa-times"
                                aria-hidden="true"
                                onClick={this.clearInput}
                            ></i>
                        </span>
                    </div>
                    <button
                        className="btn"
                        id="search-bar__button"
                        type="button"
                        onClick={(e) =>
                            this.props.setInput($('#search-bar__input').val())
                        }
                    >Search</button>
                </form>
            </div>
        )
    }
}
