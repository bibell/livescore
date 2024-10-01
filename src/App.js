import React , {useEffect} from 'react';
import {Navbar, Footer, Sidebar, ThemeSettings} from './components';
import {Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Area, 
Bar, Pie, Financial, ColorMapping, ColorPicker, Editor, Line} from './pages';
import './App.css';


import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {useStateContext} from './contexts/ContextProvider'

import Login from './login'


import './data/style.css'
import Catagory from './Catatory';
import Dynamic from './dynamic';
import AllAdds from './alladds';
import Google from './gogle'
import Google1 from './gogle1';
import Company from './company';
import Company1 from './company1';
import General from './general'
import General1 from './general1';
import Edit from './editadds';

const App = () => {

    const {activeMenu, themeSettings, setThemeSettings, currentColor, currentMode} = useStateContext();



  return (
    <>
      <HashRouter>
      <Routes>
             <Route path="/" element={<Login />}/>
         </Routes> 
    <div className={currentMode === 'Dark' ? 'dark': ''}>
         
            <div className='flex relative dark:bg-main-dark-bg'>
      

                <div className='fixed right-4 bottom-4' style={{zIndex:'1000'}}>
                    <TooltipComponent content="Settings" position='Top'>
                        <button type='button' 
                        className='text-3xl p-3 hover:drop-shadow-xl
                         hover:bg-light-gray text-white' onClick={()=> setThemeSettings(true)}
                         style={{background: currentColor, borderRadius: '50%'}}>
                            <FiSettings/>
                        </button>
                    </TooltipComponent> 
                </div>
                {activeMenu ? (
                    <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                        <Sidebar/>
                    </div>
                ) : (
                    <div className='w-0 dark:bg-secondary-dark-bg'>
                        <Sidebar/>
                    </div>
                )}
                <div className={ `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ?
                     ' md:ml-72' 
                     :'flex-2'}`
                    }>
                <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                    <Navbar/>
                </div>

                {themeSettings && <ThemeSettings/>}
                
                <div>
                    <Routes>
                        {/* Dashboard */}
                       
                        <Route path="/home" element={<Ecommerce/>}/>

                        {/* Pages */}
                        <Route path="/Post" element={<Orders/>}/>
                        <Route path="/users" element={<Employees/>}/>
                        <Route path="/employee" element={<Customers/>}/>

                        {/* Apps */}
                        <Route path="/adds" element={<Kanban/>}/>
                        <Route path="/editor" element={<Editor/>}/>
                        <Route path="/heighlight" element={<Calendar/>}/>
                        <Route path="/color-picker" element={<ColorPicker/>}/>

                        {/* Charts */}
                        <Route path="/Followers" element={<Line/>}/>
                        <Route path="/Lattest-News" element={<Area/>}/>
                        <Route path="/Transfer-News" element={<Bar/>}/>
                        <Route path="/Club-News" element={<Pie/>}/>
                        <Route path="/Financial-News" element={<Financial/>}/>
                        <Route path="/color-mapping" element={<ColorMapping/>}/>
                        <Route path="/live-Challenge" element={<Editor />}/> 
                        <Route path="/club-Challenge" element={<Editor />}/> 

                        <Route path="/Create-New-Acount" element={<Stacked/>} />
                        
                        <Route path="/live-match" element={<Pyramid/>}/>
                        <Route path="/stacked" element={<Stacked/>}/>
                        <Route path="/Create-Catagory" element={<ColorMapping/>}/>
                        <Route path='/Dynamic-Heighlight' element={<Dynamic />}/>

                        <Route path='/Advertisment' element={<AllAdds />}/>
                        <Route path='/google/adds'  element={<Google />}/>
                        <Route path='/company/adds' element={<Company />}/> 
                        <Route path='/General/adds' element={<General />}/>

                        <Route path='/General/adds1' element={<General1 />}/>
                        <Route path='/company/adds1' element={<Company1 />}/>
                        <Route path='/google/adds1' element={<Google1/>}/>
                        <Route path='/edit/adds' element={<Edit/>}/>

                        <Route path="/:name" element={<Catagory/>}/>
                        
                    </Routes>
                </div>
            </div>
            </div>
    </div>

    </HashRouter>
    </>
  )
}

export default App