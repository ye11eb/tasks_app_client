import { useState } from 'react';
import Header from './components/header/Header'
import AddTask from './components/addTask/AddTask';
import { Route, Routes } from 'react-router-dom';
import ByPriority from './views/ByPriority/ByPriority';
import Done from './pages/Done/Done';
import Inbox from './pages/Inbox/Inbox';

function App() {
  const [currentView, setCurrentView] = useState('All Tasks')
  const [tasks, setTasks] = useState([
    {
      _id: 'gdsgdfg',
      title: 'Task 1',
      "date": "2024-01-30T22:00:00.000Z",
      inbox: true,
      labels: ['Label_2', 'Label_3'],
      other: {
        default:{
          priority: 'None',
          progress: 'To Do',
        },
        posible:{
          alarm: true,
        }
      }
    },
    {
      _id: 'gdsgdf5g',
      title: 'Task 2',
      "date": "2024-01-28T22:00:00.000Z",
      description: 'Description goes here...',
      checkList: [
        {
          title: 'Checklist_1',
          done: false
        },
        {
          title: 'Checklist_2',
          done: false
        },
        {
          title: 'Checklist_3',
          done: false
        }
      ],
      inbox: true,
      labels: ['Label_2', 'Label_3', 'Label_5'],
      active: false,
      oppened: false,
      other: {
        default:{
          priority: 'Medium',
          progress: 'In Progress',
        },
        posible:{
          repeat: true,
          alarm: true,
        }
      }
    },
    {
      _id: 'gdsgdffddsf5g',
      title: 'Task 3',
      "date": "2024-01-26T22:00:00.000Z",
      checkList: [
        {
          title: 'Checklist_1',
          done: false
        },
        {
          title: 'Checklist_2',
          done: false
        },
        {
          title: 'Checklist_3',
          done: false
        }
      ],
      inbox: true,
      active: false,
      oppened: false,
      other: {
        default:{
          priority: 'High',
          progress: 'Done',
        },
      }
    },
    {
      _id: 'gdsgdffsdfsf5g',
      title: 'Task 4',
      "date": "2024-01-25T22:00:00.000Z",
      description: 'Description goes here...',
      checkList: [
        {
          title: 'Checklist_1',
          done: false
        },
        {
          title: 'Checklist_2',
          done: false
        },
        {
          title: 'Checklist_3',
          done: false
        }
      ],
      inbox: true,
      labels: ['Label_2', 'Label_3'],
      active: false,
      oppened: false,
      other: {
        default:{
          priority: 'None',
          progress: 'On Testing',
        },
        posible:{
          repeat: true,
        }
      }
    },
    {
      "_id": "gdsgdfgTaks 9",
      "title": "Taks 9",
      "date": "2024-01-29T22:00:00.000Z",
      "inbox": true,
      "labels": [
          "label3",
          "label1"
      ],
      "description": "desc",
      "checkList": [
          {
              "title": "Takasda",
              "done": false
          },
          {
              "title": "dasdads",
              "done": false
          },
          {
              "title": "dasda",
              "done": false
          }
      ],
      "other": {
          "default": {
            "priority": "Medium",
            "progress": "Done",
          },
          "posible": {
              "alarm": true,
              "repeat": true
          }
      }
  }
  ])

  // console.log(tasks);
  const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches)
  const [addTaskOpen, setAddTaskOpen] = useState(false)

  return (
    <div className="App">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        theme={theme}
        setTheme={setTheme}
      />
      <Routes>
        <Route index element={
          <Inbox
            currentView={currentView}
            theme={theme}
            tasks={tasks}
            setTasks={setTasks}
          />  
        } />
        <Route path='/done' element={
           <Done
            theme={theme}
            tasks={tasks}
            setTasks={setTasks}
          />  
        } />
      </Routes>
      {addTaskOpen && <AddTask setAddTaskOpen={setAddTaskOpen} setTasks={setTasks} tasks={tasks}/>}
      <div className="addTaskButton"
        onClick={() => setAddTaskOpen(true)}
      >
        <div className="addTaskButtonInner">
          <div className="line rotated" />
          <div className="line" />
        </div>
      </div>
    </div>
  );
}

export default App;
