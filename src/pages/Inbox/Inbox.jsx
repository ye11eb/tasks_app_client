import React from 'react'
import AllTasks from '../../views/AllTasks/AllTasks';

const Inbox = ({currentView, theme, tasks, setTasks}) => {

    console.log(currentView);

    if (currentView == 'All Tasks') {
        return (
            <AllTasks 
                theme={theme} 
                tasks={tasks} 
                setTasks={setTasks} 
            />)
    }

    return (
        <div>Inbox</div>
    )
}

export default Inbox