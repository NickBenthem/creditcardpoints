import React from 'react'
import Card from './Card'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const RewardPrograms = ({rewardprograms,cardOnSelect}) => {
    const rewardProgramSelect = rewardprograms.map(card => ({value : card.id, label : card.name}));
    const defaultOption = rewardProgramSelect[0];
   
    return (
        <>
        <h1> Your Reward Program</h1>
        <Dropdown  onChange={cardOnSelect} options={rewardProgramSelect} value={defaultOption} placeholder="Select an option" />
        </>
    )
}

export default RewardPrograms
