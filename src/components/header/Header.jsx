import React, { useState } from 'react'
import './header.scss'

//imgs
import dotsIcon from '../../media/allTasksDots.svg'
import searchIcon from '../../media/search_img.svg'
import allTasksIcon from '../../media/pages/allTasksIcon.svg'
import byPriorityIcon from '../../media/pages/byPriorityIcon.svg'
import HeaderPlussBtn from '../../media/HeaderPlussBtn.svg'


//darkThemeIcons
import allTasksIconDark from '../../media/darkMode/pages/allTasksIconDark.svg'
import byPriorityIconDark from '../../media/darkMode/pages/byPriorityIconDark.svg'
import searchIconDark from '../../media/darkMode/searchIconDark.svg'
// import allTasksIcon from '../../media/pages/allTasksIcon.svg'
import HeaderPlussBtnDark from '../../media/darkMode/HeaderPlussBtnDark.svg'

import { useEffect } from 'react'



const Header = ({ selectedField, setSelectedField, theme, setTheme }) => {
    const allFields = [
        {title: 'All Tasks', icon: allTasksIcon, darkIcon: allTasksIconDark},
        {title: 'By Priority', icon: byPriorityIcon, darkIcon: byPriorityIconDark}
    ]
    const [selectedIndex, setSelectedIndex] = useState(0)

    const indexOfSelectedField = () => (allFields.forEach(element => {
        if (element.title === selectedField) {
            setSelectedIndex(allFields.indexOf(element)) 
        }
    }))

    useEffect(() => {
        indexOfSelectedField()
    }, [selectedField])
    
    return (
        <div className='headerWrapper'>
            <div className="headerTop">
                <div className="headerTopLeft">
                    <div className="headerTopButton headerTopActiveButton">
                        <p>Inbox</p>
                    </div>
                    <div className="headerTopButton">
                        <p>Done</p>
                    </div>
                </div>

                <img src={theme ? searchIconDark : searchIcon} alt="" />
            </div>

            <div className="headerBotWrapper">
                <div className="headerBotButtonSlider" style={{left: `${100 * selectedIndex+1}px`}} />
                <div className="headerBotInner">
                    {allFields.map((element) => (
                        <div className="headerBotbutton"
                            onClick={() => setSelectedField(element.title)}
                        >
                            <img src={theme ? element.darkIcon : element.icon} alt=""  className='iconImg'/>
                            <p>{element.title}</p>
                            <img src={dotsIcon} alt="" className={element.title == selectedField ? 'dotsImg' : 'dotsImg dotsImgUnvisible'} />
                        </div>
                    ))}
                    <div className="headerBotPluss">
                        <img src={theme ? HeaderPlussBtnDark : HeaderPlussBtn} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header