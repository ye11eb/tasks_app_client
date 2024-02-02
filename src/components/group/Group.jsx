import React, { useState } from 'react'
import arrowGroupTask from '../../media/white/arrowGroupTask.svg'
import Task from '../task/Task'
import gropWrapper from './group.scss'

export const Group = ({
        groupArray,
        group, 
        updateTask,
        tasks,
        setTasks,
        handleDragStart,
        handleDragOver,
        handleDrop,
        index,
        indexSecAgo,
        underlineAfterIndex,
        theme,
        prevIndex
    }) => {
    const [groupOpnened, setGroupOpnened] = useState(true)

    return (
        <div className="groupWrapper">
            {groupArray.length > 0 && <div className="groupTop">
                <div 
                    className={groupOpnened ?  'imgWrapperGroupArrow' : 'rotated imgWrapperGroupArrow'}
                >
                    <img src={arrowGroupTask} alt=""
                    onClick={() => setGroupOpnened(!groupOpnened)}
                /> 
                </div>
                
                <p className="title">
                    {group.title}
                </p>
            </div>}
            <div data-zone='migga' className={groupOpnened ? "groupTaskWrapper" : "groupTaskWrapper groupTaskWrapperHidden"} 
            
            style={{'max-height': `${400 + group?.tasks?.length * 30}px`}}
            >
                {group?.tasks?.map((element,index) => (                
                    <Task
                        groupArray={groupArray}
                        group={group}
                        element={element} 
                        updateTask={updateTask} 
                        tasks={tasks}
                        setTasks={setTasks}
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        index={index}
                        underlineAfterIndex={underlineAfterIndex}
                        theme={theme}
                        indexSecAgo={indexSecAgo}
                        prevIndex={prevIndex}
                        fromGroup={true}
                    />
                ))}
            </div>
        </div>
    )
}
