import React, { Component } from 'react';
import './css/CardGridView.css';
import './css/CardListView.css';

export default class Card extends Component {
	constructor(props) {
    super(props);
    this.state = { showTitle: false, showDescription: false, titleValue: this.props.Title, descriptionValue: this.props.Description, id: this.props.id};
    this.delete = this.delete.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
    this.updateTitleState = this.updateTitleState.bind(this);
    this.onDescriptionClick = this.onDescriptionClick.bind(this);
    this.updateDescriptionState = this.updateDescriptionState.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }
  onTitleClick(e){
    e.preventDefault();
    this.setState((prevState) => ({
      showTitle: true,
      showDescription: prevState.showDescription,
      titleValue: prevState.titleValue,
      descriptionValue: prevState.descriptionValue,
      id: prevState.id
    }));
  }
  onDescriptionClick(e){
    e.preventDefault();
    this.setState((prevState) => ({
      showTitle: prevState.showTitle,
      showDescription: true,
      titleValue: prevState.titleValue,
      descriptionValue: prevState.descriptionValue,
      id: prevState.id
    }));
  }
  delete(e){
    e.preventDefault();
    alert("This will delete the card!! Proceed ?");
    this.props.handleDelete(e.target.id);
  }
  updateTitleState(e){
    var title=e.target.value;
    var id=e.target.id;
    this.setState((prevState) => ({
      showTitle: prevState.showTitle,
      showDescription: prevState.showDescription,
      descriptionValue: prevState.descriptionValue,
      titleValue: title,
      id: id
    }));
  }
  updateDescriptionState(e){
    var description=e.target.value;
    var id=e.target.id;
    this.setState((prevState) => ({
      showTitle: prevState.showTitle,
      showDescription: prevState.showDescription,
      descriptionValue: description,
      titleValue: prevState.titleValue,
      id: id
    }));
  }
  onTitleChange(e){
    e.preventDefault();
    this.setState((prevState) => ({
      showTitle: false,
      showDescription: prevState.showDescription,
      titleValue: prevState.titleValue,
      descriptionValue: prevState.descriptionValue,
      id: prevState.id
    }));
    this.props.editCardTitle(this.state.titleValue,this.state.id);
  }
  onDescriptionChange(e){
    e.preventDefault();
    this.setState((prevState) => ({
      showTitle: prevState.showTitle,
      showDescription: false,
      titleValue: prevState.titleValue,
      descriptionValue: prevState.descriptionValue,
      id: prevState.id
    }));
    this.props.editCardDescription(this.state.descriptionValue,this.state.id);
  }

	render() {
		const { Title, Description, id, view }=this.props;
		const cardImage = require('./Images/batman.jpg');
		const deleteCard = require('./Images/deleteIcon.png');
		const editTitle = require('./Images/edit.png');
		return (
			<div className={ view === 'grid' ? 'wrapper' : 'listWrapper' }>
        <div className={ view === 'list' ? 'deleteCard' : 'hidden' } onClick={this.delete}>
          <img src={deleteCard} id={id} alt="delete"/>
        </div>
        <div className={ view === 'grid' ? 'card' : '' }>
          <div className={ view === 'grid' ? 'cardGridImageWrapper' : 'cardListImageWrapper' }>
            <div className={ view === 'grid' ? 'deleteCardGrid' : 'hidden'} onClick={this.delete}>
              <img src={deleteCard} id={id} alt="delete" className="deleteMe"/>
            </div>
            <img src={cardImage} alt="card" className="image"/>
          </div>
  				<div className={ view === 'grid' ? 'cardDetails' : 'cardListDetails'} >
  				  { this.state.showTitle ? <form className="commentForm" onSubmit={this.onTitleChange}><input type="text" id={id} onChange={this.updateTitleState} /></form> : <div className="cardTitle" onClick={this.onTitleClick}>{Title}<img src={editTitle} alt="edit" className="editTitle"/></div>}
            { this.state.showDescription ? <form className="commentForm" onSubmit={this.onDescriptionChange}><input type="text" id={id} onChange={this.updateDescriptionState}/></form> : <div className={ view === 'grid' ? 'cardDescription' : 'cardListDescription'}>{Description}<img onClick={this.onDescriptionClick} src={editTitle} alt="edit" className={ this.props.Description === 'Add Description' ? 'editTitle' : 'hidden' }/></div> }
          </div> 
        </div>  
			</div>
		);
	}
}