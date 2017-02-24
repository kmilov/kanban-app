import React, {Component, PropTypes} from 'react'

export default class CheckList extends Component {
  checkInputKeyPress(evt) {
    if(evt.key === 'Enter') {
      this.props.tasksCallbacks.add(this.props.cardId, evt.target.value)
      evt.target.value = ''
    }
  }

  render() {
    console.log(this.props.tasksCallbacks);
    var tasks = this.props.tasks.map((task, taskindex) => {
      return <li key={task.id} className="CheckList__task">
        <input type="checkbox" defaultChecked={task.done} onChange={this.props.tasksCallbacks.toggle.bind(null, this.props.cardId, task.id, taskindex)}/>
        {task.name}
        <a
          href="#"
          className="CheckList__task--remove"
          onClick={this.props.tasksCallbacks.delete.bind(null, this.props.cardId, task.id, taskindex)}
          >
        </a>
      </li>
    });

    return (
      <div className="CheckList">
        <ul> {tasks} </ul>
        <input type="text" className="CheckList--add-task" placeholder="Type then hit Enter to add a task" onKeyPress={this.checkInputKeyPress.bind(this)} />
      </div>
    );
  }
}


CheckList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  cardId: PropTypes.number,
  tasksCallbacks: PropTypes.object.isRequired
}
