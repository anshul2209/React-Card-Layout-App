import React, { Component } from 'react';
import './css/App.css';
import Header from './Header';
import Layout from './Layout';

var cards = JSON.parse(localStorage.getItem('cards')) || [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {cards: cards, view: 'grid' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.editCardTitle = this.editCardTitle.bind(this);
    this.editCardDescription = this.editCardDescription.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }
  doSearch(e){
    e.preventDefault();
    var query=e.target.value.toLowerCase();
    var queryResult=[];
    cards.forEach(function(card){
      if(card.title.toLowerCase().indexOf(query) !== -1 || card.description.toLowerCase().indexOf(query) !== -1)
        queryResult.push(card);
    });
      this.setState((prevState) => ({
        cards: queryResult,
        view: prevState.view
      }));
  }
  editCardTitle(title,id){
    var newCards=cards;
    for (var i=0;i<newCards.length;i++)
      if (newCards[i].id === id){
        newCards[i].title = title;
      }
    localStorage.setItem('cards', JSON.stringify(newCards));
    this.setState((prevState) => ({
      cards: newCards,
      view: prevState.view
    }));
  }
  editCardDescription(description,id){
    var newCards=cards;
    for (var i=0;i<newCards.length;i++)
      if (newCards[i].id === id){
        newCards[i].description = description;
      }
    localStorage.setItem('cards', JSON.stringify(newCards));
    this.setState((prevState) => ({
      cards: newCards,
      view: prevState.view
    }));
  }
  handleSubmit() {
    console.log("i am called");
    var newCards=cards;
    var newCard = {
      title: 'Add Title',
      description: 'Add Description',
      id: Math.random().toString(36).substring(7)
    };
    newCards.push(newCard);
    localStorage.setItem('cards', JSON.stringify(newCards));
    this.setState((prevState) => ({
      cards: newCards,
      view: prevState.view
    }));
  }
  handleToggle(view) {
    this.setState((prevState) => ({
      cards: prevState.cards,
      view: view
    }));
  }
  handleDelete(id) {
    for (var i=0;i<cards.length;i++)
      if (cards[i].id === id){
        cards.splice(i,1);
        break;
      }
    localStorage.setItem('cards', JSON.stringify(cards));
    this.setState((prevState) => ({
      cards: cards,
      view: prevState.view
    }));
  }
  render() {
    return (
      <div className="App">
        <Header handleSubmit={this.handleSubmit.bind(this)} handleToggle={this.handleToggle.bind(this)} layout={this.state.view}/>
        <div className="App-body">
          <div className="filterWrapper">
            <div className="searchbar">
              <form>
                <input type="text" ref="searchInput" name="search" placeholder="Search.." onChange={this.doSearch}/>
              </form>
            </div>
            <Layout cards={this.state.cards} view={this.state.view} editCardDescription={this.editCardDescription} editCardTitle={this.editCardTitle} handleDelete={this.handleDelete} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
