import { useState } from 'react';

interface PlayerProps {
 name: string
 symbol: string
}

export default function Player({ name, symbol }: PlayerProps) {
 const [isEditing, setIsEditing] = useState(false);
 const [editedName, setEditedName] = useState(name);
 const handleEditClick = () => {
  setIsEditing(prev => !prev);
 };
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setEditedName(e.target.value);
 }
 let playerName = <span className="player-name">{editedName}</span>;
 if (isEditing) {
  playerName = <input required type="text" value={editedName} onChange={handleChange} />
 }
 return (
  <li>
   <span className='player'>
    {playerName}
    <span className="player-symbol">{symbol}</span>
   </span>
   <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
  </li >
 )
}