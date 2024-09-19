import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { fetchAndAddLinks, links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [loadedLinks, setLoadedLinks] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  
/** *  
  const element = [
    sessionStorage.getItem('admin'),
    sessionStorage.getItem('news'),
    sessionStorage.getItem('Live-Match'),
    sessionStorage.getItem('Live-Challenge'),
    sessionStorage.getItem('adminuser'),
    sessionStorage.getItem('adminemployee'),
    1, sessionStorage.getItem('ads'),
    sessionStorage.getItem('see'),
    sessionStorage.getItem('employee'),
    sessionStorage.getItem('create'),
    1, 1, 1, 1, 1, 0, 1, 0, 0, 0, sessionStorage.getItem('create'), 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, sessionStorage.getItem('create-catagory'),
    sessionStorage.getItem('create-catagory'),
    sessionStorage.getItem('view-catagory'), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
**/
  
  
  
let element=[]
let allowedPhoneNumber ='0900766703';  
let phoneNumber = '0900766703';

if(sessionStorage.getItem('phone') === allowedPhoneNumber) {
  element.fill(1);
}else{
  element=[]
}


  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  useEffect(() => {
    const loadLinks = async () => {
      await fetchAndAddLinks();
      setLoadedLinks([...links]);
      console.log('Loaded Links:', links);
    };

  

    loadLinks();
  }, []);

  return (
    <div id="sidebar" className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (
        <>
          <div className='flex justify-between items-center'>
            <Link to="/home" onClick={handleCloseSideBar} className='items-center flex gap-3 ml-3 mt-4 text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
              <SiShopware /> <span>Sport Game</span>
            </Link>
            <TooltipComponent content="Menu" position='BottomCenter'>
              <button type='button' onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10">
            {loadedLinks.map((item, index) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link, linkIndex) => {
                  const shouldDisplay = element[linkIndex] === '1' || element[linkIndex] === 1;
                  const isPhoneNumberAllowed = phoneNumber === allowedPhoneNumber;

                  const isLinkAllowed = !(
                    (link.name?.includes('News') && sessionStorage.getItem('news') !== '1') ||
                    (link.name?.includes('Highlight') && sessionStorage.getItem('highlight') !== '1') ||
                    (link.name?.includes('Block-User') && sessionStorage.getItem('block') === '0') ||
                    (link.name?.includes('Create-New-Acount') && sessionStorage.getItem('create') !== '1') ||
                    (link.name?.includes('Live-Match') && sessionStorage.getItem('Live-Match') !== '1') ||
                    (link.name?.includes('Live-Challenge') && sessionStorage.getItem('Live-Challenge') !== '1') ||
                    (link.name?.includes('Post') && sessionStorage.getItem('see') !== '1')
                  );

                  return (
                    shouldDisplay && isPhoneNumberAllowed && isLinkAllowed && (
                      <div key={link.name} className="relative">
                        <NavLink
                          to={`/${link.name}`}
                          style={({ isActive }) => ({ backgroundColor: isActive ? currentColor : '' })}
                          onClick={handleCloseSideBar}
                          className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        >
                          {link.icon}
                          <span className="capitalize">{link.name}</span>
                        </NavLink>
                      </div>
                    )
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;