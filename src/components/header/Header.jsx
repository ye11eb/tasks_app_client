import React, { useEffect, useState } from 'react'
import './header.scss'
import icons from '../../utils/ThemeIconPicker'
import { NavLink, useNavigate } from 'react-router-dom';


//imgs
// import dotsIcon from '../../media/allTasksDots.svg'
// import searchIcon from '../../media/search_img.svg'
// import allTasksIcon from '../../media/pages/allTasksIcon.svg'
// import byPriorityIcon from '../../media/pages/byPriorityIcon.svg'
// import HeaderPlussBtn from '../../media/HeaderPlussBtn.svg'


//darkThemeIcons
// import allTasksIconDark from '../../media/darkMode/pages/allTasksIconDark.svg'
// import byPriorityIconDark from '../../media/darkMode/pages/byPriorityIconDark.svg'
// import searchIconDark from '../../media/darkMode/searchIconDark.svg'
// // import allTasksIcon from '../../media/pages/allTasksIcon.svg'
// import HeaderPlussBtnDark from '../../media/darkMode/HeaderPlussBtnDark.svg'

const Header = ({ currentView, setCurrentView, theme, setTheme }) => {

    const navigate = useNavigate()
    // console.log(icons);
    const allFields = [
        {title: 'All Tasks', icon: icons.allTasksIcon},
        {title: 'By Priority', icon: icons.byPriorityIcon}
    ]
    const [selectedIndex, setSelectedIndex] = useState(0)

    const indexOfSelectedField = () => (allFields.forEach(element => {
        if (element.title === currentView) {
            setSelectedIndex(allFields.indexOf(element)) 
        }
    }))

    useEffect(() => {
        indexOfSelectedField()
    }, [currentView])
    
    return (
        <div className='headerWrapper'>
            <div className="headerTop">
                <div className="headerTopLeft">
                    <div className="headerTopButton headerTopActiveButton">
                        <NavLink
                            to={'/'}
                        >
                            <p>Inbox</p>
                        </NavLink>
                    </div>
                    <div className="headerTopButton">
                        <NavLink
                            to={'/done'}
                        >
                            <p>Done</p>
                        </NavLink>
                    </div>
                </div>

                <img src={icons.searchIcon} alt="" />
            </div>

            <div className="headerBotWrapper">
                <div className="headerBotButtonSlider" style={{left: `${100 * selectedIndex+1}px`}} />
                <div className="headerBotInner">
                    {allFields.map((element) => (
                        <div className="headerBotbutton"
                            onClick={() => setCurrentView(element.title)}
                        >
                            <img src={element.icon} alt=""  className='iconImg'/>
                            <p>{element.title}</p>
                            <img src={icons.dotsIcon} alt="" className={element.title === currentView ? 'dotsImg' : 'dotsImg dotsImgUnvisible'} />
                        </div>
                    ))}
                    <div className="headerBotPluss">
                        <img src={icons.HeaderPlussBtn} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header