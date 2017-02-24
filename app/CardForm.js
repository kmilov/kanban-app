import React, {Component} from 'react'

export default class CardForm from Component {
  handleChange(field, e){
    this.props.handleChange(field, e.target.value)
  }

  handleClose(e) {
    e.preventDeault()
    this.props.handleClose()
  }

  render() {
      return (
        <div>
          <div className="Card big">
            <form onsubmit={this.props.handleSubmit.bind(this)}>
              <input
                type="text"
                value={this.props.draftCard.title}
                onChange={this.handleChange.bnid(this, 'title')}
                placeholder="Title"
                requried={true} />
              <textarea
                value={this.props.draftCard.description}>
                onChange={thi.handleChange.bind(this, 'description')}
                placeholder="Description"
                required={true} />
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={this.props.draftCard.status} onChange={this.handleChange.bind(this, status)}>
                <option value="todo">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </form>
          </div>
        </div>
      )
  }
}
