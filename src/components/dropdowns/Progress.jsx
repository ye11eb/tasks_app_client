import React from 'react'
import './dropdowns.scss'

const Progress = ({progressVariants, setProgress}) => {
  return (
    <div className="Select selectProgress">
        {progressVariants.map((Item) => (
            <div className="SelectUnit"
                onClick={() => setProgress(Item)}
            >
                <img src={Item.icon} alt="" />
                <p>{Item.title}</p>
            </div>  
        ))}
    </div>
  )
}

export default Progress