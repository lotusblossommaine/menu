import { useRef, useState } from 'react';

import './App.css';
import image from "./assets/backgroundImage.jpg";
import { Menu } from './components/Menu/Menu';
import { MenuKey } from './components/MenuKey/MenuKey';
import { ScrollButtons } from './components/ScrollButtons/ScrollButtons';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Banner } from './components/Banner/Banner';

function App() {
  const [isTakeout, setIsTakeout] = useState(false)

  const luncheonSpecialsRef = useRef(null);
  const drinksRef = useRef(null);

  return (
    <div className="App" >
      <div style={{ backgroundImage: `url(${image})` }} className="backgroundImage">
        <Banner />
        <Header isTakeout={isTakeout} setIsTakeout={setIsTakeout} />
        <div className="backgroundOverlay">
          <div className="content">
            <div className="contentHeader">
              <h1>{isTakeout ? 'TAKEOUT MENU' : 'DINE-IN MENU'}</h1>
              <ScrollButtons luncheonSpecialsRef={luncheonSpecialsRef} drinksRef={drinksRef} isTakeout={isTakeout} />
            </div>
            <MenuKey />
            <Menu isTakeout={isTakeout} luncheonSpecialsRef={luncheonSpecialsRef} drinksRef={drinksRef} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
