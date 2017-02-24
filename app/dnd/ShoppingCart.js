import React, {Component, PropTypes} from 'react'
import {DropTarget} from 'react-dnd'
import constants from './constants'


// ShoppingCart DND spec
const ShoppingCartSpec = {
  drop() {
    return {name: 'ShoppingCart'}
  }
}

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}
// ShoppingCart DropTarget - collect
class ShoppingCart extends Component {
  render() {
    const {canDrop, isOver, connectDropTarget} = this.props

    const isActive = canDrop && isOver

    let backgroundColor = '#fff'

    if(isActive) {
      backgroundColor = '#f7f7bd'
    }
    else if(canDrop) {
      backgroundColor = '#f7f7f7'
    }

    const style = {
      backgroundColor: backgroundColor
    }

    return (
      connectDropTarget(
        <div className="ShoppingCart" style={style}>
          {isActive ?
            'Hummm, snack!' :
            'Drag here to order!'
          }
        </div>
      )
    )
  }
}


ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart)
