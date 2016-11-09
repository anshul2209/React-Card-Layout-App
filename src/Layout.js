import React, { Component } from 'react';
import './css/Layout.css';
import Card from './Card.js';

export default class Layout extends Component {
	render() {
    const { cards, view } = this.props;
    const cardsData = cards.map((card) => {
      return (
      	<div key={card.id}>
          <Card view={view} editCardDescription={this.props.editCardDescription} editCardTitle={this.props.editCardTitle} handleDelete={this.props.handleDelete} Title={card.title} Description={card.description} id={card.id} />
        </div>
      );
    });
		return (
			<div className={ this.props.view === 'grid' ? 'gridWrapper' : 'listLayoutWrapper'}>
				{cardsData}
			</div> 
		);
	}
}