import React from 'react'
import Card from './Card'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Cards = ({cards,cardOnSelect}) => {
    const cardSelect = cards.map(card => ({value : card.id, label : card.name}));
    const defaultOption = cardSelect[0];
   
    return (
        <>
        <h1> Your Credit Card</h1>
        <Dropdown  onChange={cardOnSelect} options={cardSelect} value={defaultOption} placeholder="Select an option" />
        </>
    )
}

export default Cards
