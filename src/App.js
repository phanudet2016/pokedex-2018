import React, { Component } from 'react'
import Header from './components/Header/header.js'
import Modal from "react-responsive-modal"
import './App.css'

// const COLORS = {
//   Psychic: "#f8a5c2",
//   Fighting: "#f0932b",
//   Fairy: "#c44569",
//   Normal: "#f6e58d",
//   Grass: "#badc58",
//   Metal: "#95afc0",
//   Water: "#3dc1d3",
//   Lightning: "#f9ca24",
//   Darkness: "#574b90",
//   Colorless: "#FFF",
//   Fire: "#eb4d4b"
// }

class App extends Component {

  constructor(props) {
    super(props);

    this.addCard = this.addCard.bind(this)
    
    this.state = {
      data: [],
      isLoaded: false,
      items: [],
      open: false,
      percentage: 0,
      search : ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:3030/api/cards')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.cards
        })
    })
  }

  onchange = e =>{
    this.setState({ search : e.target.value });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  addCard = (hp, id, name, imageUrl, attacks, weaknesses) =>  {
    let objAtt = Object.keys(attacks).length
    let objWeak = Object.keys(weaknesses).length
    let att
    let weak
    let items = this.state.items
    const card = this.state.data.slice(0);
     
    if (objAtt === 2) {
      att = 100
    }
    else if (objAtt === 1) {
      att = 50
    } else {
      att = 0
    }

    if (objWeak  === 1) {
      weak = 100
    } else {
      weak = 0
    }

    card.push({
      id: this.state.data.length + 1,
      hp: hp,
      name: name,
      imageUrl: imageUrl,
      attacks: att,
      weaknesses: weak
    });
    this.setState({
      data: card,
    });

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items.splice(i, 1)
      }
    }
    this.setState({items: items})
  }

  handleDelete (e, name) {
    let data = this.state.data
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === e) {
        data.splice(i, 1)
      }
    }
    this.setState({data: data})
  }

  render() {
    var { isLoaded, items, data, search, open } = this.state
    const Pokemon = items.filter( Pokemon =>{
      return Pokemon.name.toLowerCase().indexOf( search.toLowerCase() ) !== -1 || Pokemon.type.toLowerCase().indexOf( search.toLowerCase() ) !== -1
    })
    
    const FillerHP = (props) => {
      let percentage
      if (props.percentage > 100) {
        percentage = 100
      } 
      else if (props.percentage === 'None') {
        percentage = 0
      } else {
        percentage = props.percentage
      }
      return <div className="filler" style={{ width: `${percentage}%` }}></div>
    }
    const ProgressBarHP = (props) => {
      return (
        <div className="progress-bar">
          <FillerHP percentage={props.percentage}></FillerHP>
        </div>
      )
    }

    const FillerSTR = (props) => {
      let percentage
      let attacks = Object.keys(props.percentage).length

      if (attacks === 2) {
        percentage = 100
      } 
      else if (attacks === 1) {
        percentage = 50
      } else {
        percentage = 0
      }
      return <div className="filler" style={{ width: `${percentage}%` }}></div>
    }
    const ProgressBarSTR = (props) => {
      return (
        <div className="progress-bar">
          <FillerSTR percentage={props.percentage}></FillerSTR>
        </div>
      )
    }

    const FillerSTR1 = (props) => {
      return <div className="filler" style={{ width: `${props.percentage}%` }}></div>
    }
    const ProgressBarSTR1 = (props) => {
      return (
        <div className="progress-bar">
          <FillerSTR1 percentage={props.percentage}></FillerSTR1>
        </div>
      )
    }
    
    const FillerWeak = (props) => {
      let percentage
      let Weak = Object.keys(props.percentage).length

      if (Weak  === 1) {
        percentage = 100
      } else {
        percentage = 0
      }
      return <div className="filler" style={{ width: `${percentage}%` }}></div>
    }
    const ProgressBarWeak = (props) => {
      return (
        <div className="progress-bar">
          <FillerWeak percentage={props.percentage}></FillerWeak>
        </div>
      )
    }
    const FillerWeak1 = (props) => {
      return <div className="filler" style={{ width: `${props.percentage}%` }}></div>
    }
    const ProgressBarWeak1 = (props) => {
      return (
        <div className="progress-bar">
          <FillerWeak1 percentage={props.percentage}></FillerWeak1>
        </div>
      )
    }
    
    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="box-container">
          <Header/>
          <Modal closeButton open={open} onClose={this.onCloseModal} center showCloseIcon={false}>
          <input className="search" type="text" placeholder="Find Pokemon" onChange={this.onchange}/><br/><br/>
          {Pokemon.map(item => (
            <div className="card-modal" key={item.id}>
              <div className="block">
                  <img src={item.imageUrl} alt="" width="170" height="265"/>
              </div>
              <div className="block text">
                <h1>{item.name}</h1><br/>
                  HP: <ProgressBarHP percentage={item.hp}/><br/>
                  STR: <ProgressBarSTR percentage={item.attacks}/><br/>
                  WEAK: <ProgressBarWeak percentage={item.weaknesses}/><br/><br/>
                  <img src={require('./cute.png')} alt="" width="50" height="50"/>
                  <img src={require('./cute.png')} alt="" width="50" height="50"/>
                  <img src={require('./cute.png')} alt="" width="50" height="50"/>
                  <img src={require('./cute.png')} alt="" width="50" height="50"/>
                  <img src={require('./cute.png')} alt="" width="50" height="50"/>
                </div>
              <div className="block addLeft">
                <button className="add" onClick={() => this.addCard(item.hp, item.id, item.name, item.imageUrl, item.attacks, item.weaknesses)}>Add</button>
              </div>
            </div>
          ))}
          </Modal>
          
          {data.map(item => (
            <div className="card" key={item.id}>
              <div className="block">
                  <img src={item.imageUrl} alt="" width="170" height="265"/>
              </div>
              <div className="block text">
              <h1 className="Name">{item.name}</h1><br/>
                  HP: <ProgressBarHP percentage={item.hp}/><br/>
                  STR: <ProgressBarSTR1 percentage={item.attacks}/><br/>
                  WEAK: <ProgressBarWeak1 percentage={item.weaknesses}/><br/><br/>
              <img src={require('./cute.png')} alt="" width="50" height="50"/>
              <img src={require('./cute.png')} alt="" width="50" height="50"/>
              <img src={require('./cute.png')} alt="" width="50" height="50"/>
              <img src={require('./cute.png')} alt="" width="50" height="50"/>
              <img src={require('./cute.png')} alt="" width="50" height="50"/>
              </div>
              <div className="block addLeft">
                  <span className="add-1" onClick={() => this.handleDelete(item.id, item.name)}>X</span>
              </div>
            </div>
          ))}
          <div className="footer">
            <button className="button" onClick={this.onOpenModal}>+</button>
          </div>
        </div>
      )
    }
  }
}

export default App
