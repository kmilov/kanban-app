import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import List from './List';

// Recoinciliation, React phase before touch the DOM
// React has a few steps to decide how to udpate the DOM
// depending of the change that happened
// -> React uses event delegation on the ROOT component
// and attach the events and unbind them on umount phase
// Controlled componentes: components that are based on the state
// Uncontrolled componentes, the ones that can be mutated on DOM side
// and they way to get them is via refs or onSubmit
class KanbanBoard extends Component {
  render() {
    let cardModal = this.props.children && React.cloneElement(this.props.children, {
      cards: this.props.cards,
      cardCallbacks: this.props.cardCallbacks
    })
    return (
      <div className="App">
        <List
          tasksCallbacks={this.props.tasksCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          id="todo"
          title="To Do"
          cards={ this.props.cards.filter((card) => card.status === "todo")}>
        </List>
        <List
          tasksCallbacks={this.props.tasksCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          id="in-progress"
          title="In Progress"
          cards={ this.props.cards.filter((card) => card.status === "in-progress")}>
        </List>
        <List
          tasksCallbacks={this.props.tasksCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          id="done"
          title="Done"
          cards={ this.props.cards.filter((card) => card.status === "done")}>
        </List>
        {cardModal}
      </div>
    );
  }
}
KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  tasksCallbacks: PropTypes.object.isRequired,
  cardCallbacks: PropTypes.object.isRequired
}

export default DragDropContext(HTML5Backend)(KanbanBoard)
