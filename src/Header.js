import React, { Component } from 'react';
import './css/Header.css';

export default class Header extends Component {
	constructor(props) {
    super(props);
    this.addCard = this.addCard.bind(this);
    this.toggle = this.toggle.bind(this);
  }
	addCard(e){
		e.preventDefault();
		this.props.handleSubmit();
	}
	toggle(e){
		e.preventDefault();
		this.props.handleToggle(e.target.name);
	}
	render() {
		const list = require('./Images/list.png');
		const plus = require('./Images/Plus.png');
		const grid = require('./Images/grid.png');

		return (
			<div className="headerWrapper">
				<div className="companyTitle">LOGO</div>
				<div className="navRight">
					<div className="add">
					  <img src={plus} name="plus" className="plusIcon" alt="plus" onClick={this.addCard}/>
					  <input type="button" value="Create New Card" className="addCard" onClick={this.addCard}/>
					</div>
					<div className="listView" name={'list'} onClick={this.toggle}>
						<img src={list} name="list" className="listIcon" alt="list"/>
					</div>
					<div className="gridView" name={'grid'} onClick={this.toggle} >
					  <img src={grid} name="grid" className="gridIcon"alt="grid"/>
					</div>
				</div>
			</div>
		);
	}
}