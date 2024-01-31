import React from 'react'
import './dropdowns.scss'

export const Prority = ({priorityVariants, setPriority}) => {
  return (
    <div className="Select selectPriority">
      {priorityVariants.map((Item) => (
          <div className="SelectUnit"
          onClick={() => setPriority(Item)}
      >
          <img src={Item.icon} alt="" />
          <p>{Item.title}</p>
      </div>  
      ))}
    </div>
    
  )
}
