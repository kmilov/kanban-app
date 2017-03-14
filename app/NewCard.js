import React, {Component, PropTypes} from 'react'
import CardForm from './CardForm'

export default class NewCard extends Component {
  componentWillMount() {
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: 'todo',
      colors: '#c9c9c9',
      tasks: []
    })
  }


  handleChange(field, value) {
    this.setState({[field]: value})
  }

  handleSubmit(e) {
    e.preventDeault();
    this.props.cardCallbacks.addCard(this.state)
    this.props.history.pushState(null, '/')
  }

  handleClose() {
    this.props.history.pushState(null, '/')
  }


  render() {
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel="Create Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)}
         />
    )
  }
}

NewCard.propTypes = {
  cardCallbacks: PropTypes.object
}
