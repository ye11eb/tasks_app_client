import React, { useEffect, useState } from 'react'
import Icons from '../../../utils/ThemeIconPicker'
import nextId from "react-id-generator";

const CheckListItem = ({el, index, handleKeyDown, setCheckList, checkList}) => {
    const [listItem, setListItem] = useState(el)
    const [listItemTitle, setListItemTitle] = useState(el?.title)
    const [prevState, setPrevState] = useState()
    const checkListId = nextId();
    // console.log(checkListlId);
    const handleKeyDownHandler = event => {
        console.log('====================================');
        console.log(event.key);
        console.log('====================================');
        if (event.key === 'Backspace') {
            if (listItem.title.length == 0 && checkList.length > 1) {
                let updatedChecklist = [] 
                checkList.forEach(element => {
                    if (element.title.length > 0) {
                        console.log('pushed');
                        updatedChecklist.push(element)
                    }
                });
                console.log('====================================');
                console.log(updatedChecklist);
                console.log('====================================');
                setCheckList(updatedChecklist)
            }else if(listItem.title.length == 1) {
                setListItem({title: listItem.title.slice(0, -1), done: false, _id: el._id })
            }
            
            
        }else{
            handleKeyDown(event, listItem, setListItem)
        }
    };

    const setListItemHandler = () => {
        if (listItemTitle?.length == 0 && prevState?.length > listItemTitle?.length) {
            let updatedChecklist = [] 
            checkList.forEach(element => {
                if (element._id !== el._id) {
                    updatedChecklist.push(element)
                }
            });
            setCheckList(updatedChecklist)
            updatedChecklist.forEach((element) => {
                if (element._id == listItem._id) {
                    let updatedElement = element
                    updatedElement._id = checkListId
                    console.log(updatedElement);
                    setListItem(updatedElement)
                    setListItemTitle(updatedElement.title)
                }
            })
            
            // setCheckList(checkList.filter(element => element._id !== el._id))
        }else{
            setListItem({title: listItemTitle, done: false,_id: checkListId})
        }
        setPrevState(listItemTitle)

    }

    console.log(checkList);

    useEffect(() => {
        if (!listItem?._id) {
            let updatedListItem = listItem
            updatedListItem._id = checkListId
            setListItem(updatedListItem)
        }
    }, [])
    

    useEffect(() => {
        let newCheckList = checkList
        newCheckList[index] = listItem
        setCheckList(newCheckList)
    }, [listItem])

    useEffect(() => {
        setListItemHandler()
    }, [listItemTitle])

    return (
        <div className="inputWrapper">
            {listItem.title.length > 1 ? <img src={Icons.checkListActiveCircleIcon} alt="" /> : <img src={Icons.checkListCircleIcon} alt="" />}
            {listItem && <input 
                autoFocus={checkList.length > 1}
                type="text" 
                placeholder='Checklist'
                className='AddTaskInput'
                value={listItemTitle}
                onKeyDown={handleKeyDownHandler}
                onChange={(e) => setListItemTitle(e.target.value)}
                // onKeyDown={(e) => handleKeyDown(e, listItem, setListItem)}
            />}
        </div>
    )
}

export default CheckListItem