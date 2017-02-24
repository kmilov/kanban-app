import React, {Component, PropTypes} from 'react'
import {DropTarget} from 'react-dnd'
import Card from './Card'
import constants from './constants'

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id
    props.cardCallbacks.updateStatus(draggedId, props.id)
  }
}

function collect(connect, monitor){
  // body...
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class List extends Component {
  render(){
    const {connectDropTarget} = this.props

    let cards = this.props.cards.map((card) => {

      return <Card
              id={card.id}
              key={card.id}
              title={card.title}
              description={card.description}
              tasks={card.tasks}
              color={card.color}
              tasksCallbacks={this.props.tasksCallbacks}
              cardCallbacks={this.props.cardCallbacks}/>
    })

    return connectDropTarget(
      <div className="List">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    )
  }
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  tasksCallbacks: PropTypes.object.isRequired,
  cardCallbacks: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List)
