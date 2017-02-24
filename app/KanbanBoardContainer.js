import React, {Component, PropTypes} from 'react'
import KanbanBoard from './KanbanBoard'
import update from 'react-addons-update'
import {throttle} from './utils'

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'kmil0cv@gmail.com'
}
export default class KanbanBoardContainer extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      cards: []
    }

    this.updateCardStatus = throttle(this.updateCardStatus.bind(this))

    this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500)
  }

  componentDidMount() {
    fetch(API_URL+'/cards',  {headers: API_HEADERS})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({cards: responseData})
        console.log(responseData);
      })
      .catch((error) => {
        console.log('error fetching and parsing data', error);
      })
  }

  persistCardDrag(cardid, status) {
    let prevState = this.state
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardid)

    let card = this.state.cards[cardIndex]

    fetch(`${API_URL}/cards/${cardid}`,{
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({status: card.status, row_order_position: cardIndex})
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error("server response wasn't ok on udpate order")
      }
    })
    .catch((error) => {
      console.error("Fetch error: ", error);
      this.setState(update(this.state,{
        cards: {
          [cardIndex]: {
            stats: {$set: status}
          }
        }
      }))
    })
  }

  updateCardStatus(cardid, listid) {
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardid)
    let card = this.state.cards[cardIndex]


    if(card.status !== listid) {
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: {$set: listid}
          }
        }
      }))
    }
  }

  updateCardPosition(cardid, afterid) {
    if(cardid !== afterid) {
      let cardIndex = this.state.cards.findIndex((card) => cardid === card.id)

      let card = this.state.cards[cardIndex]

      let afterIndex = this.state.cards.findIndex((card) => card.id === afterid)

      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }))

    }
  }

  addTask(cardid, taskname) {
    // save prev states
    let oldState = this.state;

    let task = {
      name: taskname,
      done: false,
      id: Date.now(),
    }
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardid)

    let nextState = update(this.state.cards, {[cardIndex]: {tasks: {$push: [task]} } })

    this.setState({
      cards: nextState
    })

    fetch(API_URL+`/cards/${cardid}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(task)
    })
      .then((response) => {
        if(!response.ok){
          throw new Error("Server reponse wasn't ok")
        }
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
        this.setState(oldState)
      })
  }

  deleteTask(cardid, taskid, taskindex) {
    let oldState = this.state

    let cardIndex = this.state.cards.findIndex((card) => card.id === cardid)
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$splice: [[taskindex, 1]]}
      }
    })

    this.setState( {
      cards: nextState
    })


    fetch(API_URL+`/cards/${cardid}/tasks/${taskid}`, {
      method: 'delete',
      headers: API_HEADERS
    })
      .then((response) => {
        if(!response.ok) {
          throw new Error("Something went wrong in server side!")
        }
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
        this.setState(oldState);
      })
  }

  toggleTask(cardid, taskid, taskindex) {
    let oldState = this.state

    let cardIndex = this.state.cards.findIndex((card) => card.id === cardid)

    let newDoneValue;

    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskindex]: {
            done: {$apply: (done) => {
                newDoneValue = !done
                return newDoneValue
              }
            }
          }
        }
      }
    })

    this.setState(oldState)

    fetch(API_URL+`/cards/${cardid}/tasks/${taskid}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done: newDoneValue})
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error('Ups! there was an error updating the state of task')
      }
    })
    .catch((error) => {
      console.error("Fetch error: ", error);
      this.setState(oldState)
    })
  }

  render() {

    return <KanbanBoard
            cards={this.state.cards}
            tasksCallbacks={{
              toggle: this.toggleTask.bind(this),
              delete: this.deleteTask.bind(this),
              add: this.addTask.bind(this),
            }}
            cardCallbacks={{
              updateStatus: this.updateCardStatus,
              updatePosition: this.updateCardPosition,
              persistCardDrag: this.persistCardDrag.bind(this)
            }}/>
  }

}
