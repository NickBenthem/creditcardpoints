import React from 'react'
import Card from './Card'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const TravelPartners = ({travelpartners,cardOnSelect}) => {
    const travelPartnersSelect = travelpartners.map(partner => ({value : partner.id, label : partner.name}));
    const defaultOption = travelPartnersSelect[0];
   
    return (
        <>
        <h1> Reward Program</h1>
        <Dropdown  onChange={cardOnSelect} options={travelPartnersSelect} value={defaultOption} placeholder="Select an option" />
        </>
    )
}

export default TravelPartners
