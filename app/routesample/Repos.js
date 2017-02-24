import React, {Component} from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'


export default class Repos extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      repositories: []
    }
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/pro-react/repos`)
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        repositories: response
      })
    })
    .catch((error) => {
      this.context.router.push('/error');
    })
  }

  render() {

    let repos = this.state.repositories.map((repo) => (
      <li key={repo.id}>
        <Link to={"/repo/"+repo.name}>{repo.name}</Link>
      </li>
    ));

    let child = this.props.children && React.cloneElement(this.props.children, {repositories: this.state.repositories});

    return (
      <div>
        <h1>Github Repos</h1>
        <ul>
          {repos}
        </ul>

        {child}
      </div>
    )
  }
}

Repos.contextTypes = {
  router: React.PropTypes.object.isRequired
}
