/*
Udemy course: https://www.udemy.com/course/react-three-fiber-configurator
*/

import { createRoot } from 'react-dom/client'
import './styles.css'
import { App as Canvas } from './Canvas'
import { Overlay } from './Overlay'
import Logo from './Logo'
import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import { Flex, Text, Button } from '@radix-ui/themes';

createRoot(document.getElementById('root')).render(
  <>
<Theme style={{width:"100%",height:"100%"}}>

    <Canvas />


    <Overlay />
    </Theme>
  </>
)
