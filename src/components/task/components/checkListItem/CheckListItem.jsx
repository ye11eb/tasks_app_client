import React, { useEffect, useState } from 'react'
import Icons from '../../../../utils/ThemeIconPicker.js'
import './checkListItem.scss'

export const CheckListItem = ({el, checkBoxes, setCheckBoxes}) => {
  const [checked, setChecked] = useState(el.done)

  useEffect(() => {
    let updatedCheckboxes = []
    checkBoxes.forEach(checkBox => {
      if (checkBox !== el) {
        updatedCheckboxes.push(checkBox)
      }else{
        let updatedCheckBox = checkBox;
        updatedCheckBox.done = checked
        updatedCheckboxes.push(updatedCheckBox)
      }
    });
    setCheckBoxes(updatedCheckboxes)
  }, [checked])
  
  return (
    <div className="checkListItemsWrapper">
        <div className="checkListItem">
            {el.done ? 
              <img src={Icons.checkListActiveCircleIcon} alt="" 
                onClick={() => setChecked(false)}
              />
              : <img src={Icons.checkListCircleIcon} alt="" 
                onClick={() => setChecked(true)}
              />
            }
            <p>{el.title}</p>
        </div>
    </div>
  )
}
