import { FaTimes } from 'react-icons/fa'

const Card = ({ card, onDelete, onToggle }) => {
  return (
    <div
      className={"card"}
    >
      <h3>
        {card.name}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
        />
      </h3>
    </div>
  )
}

export default Card
