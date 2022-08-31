import reactLogo from './assets/react.svg'
import './App.css'

// import { CollapseBox } from './components/Collapse'
// import { Fragment } from 'react'

import { Tooltip } from './components/Tooltip'
// import { Collapse } from './components/Collapse'
import { CollapseBox } from './components/CollapseBox'

const App = () => {
  return <>
  <CollapseBox><CollapseBox.Control>Toggle collapse</CollapseBox.Control><CollapseBox.Collapse><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores minus eos illum quaerat nulla! At facere aspernatur necessitatibus expedita magnam delectus rem architecto! Minima quaerat facilis vel, voluptates ab libero.
  Architecto dolorem unde, quas animi ea ipsum non ad quae a esse consequatur laborum tenetur possimus consequuntur fugit, distinctio mollitia est quia adipisci harum deserunt. Doloribus optio pariatur labore ullam.
  Beatae dolores tempore delectus est ex, aperiam ipsum labore nobis! Laborum saepe molestias eius magni quis odio ullam neque, obcaecati facere, rerum excepturi libero in distinctio? Libero in blanditiis ullam.</p></CollapseBox.Collapse></CollapseBox>
  </>
}

export default App
