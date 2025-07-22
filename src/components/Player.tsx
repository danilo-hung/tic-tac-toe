import { useState } from 'react';

interface PlayerProps {
 name: string
 symbol: 'O' | 'X'
 isActive: boolean,
 onChangePlayerName: (symbol: 'O' | 'X', newName: string) => void
}

export default function Player({ name, symbol, isActive, onChangePlayerName }: PlayerProps) {
 const [isEditing, setIsEditing] = useState(false);
 const [editedName, setEditedName] = useState(name);
 const handleEditClick = () => {
  setIsEditing(prev => !prev);

  if (isEditing) {
   onChangePlayerName(symbol, editedName)
  }
 };
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setEditedName(e.target.value);
 }
 let playerName = <span className="player-name">{editedName}</span>;
 if (isEditing) {
  playerName = <input required type="text" value={editedName} onChange={handleChange} />
 }
 return (
  <li className={isActive ? 'active' : undefined}>
   <p className='player'>
    {playerName}
   </p>
   <span className="player-symbol">{symbol}</span>
   <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
  </li >
 )
}