import React from 'react'
import Button from '@mui/material/Button';
import { Slide, Grow } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        timeout={1000}
      >
        <h1>Welcome to booktopia!</h1>
      </Grow>
      <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1200}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In vel exercitationem ab molestiae. Alias libero modi rerum atque perspiciatis sint? Quo eum molestias necessitatibus qui sequi accusantium laborum voluptate commodi!</p>
      </Slide>
      
      <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1400}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In vel exercitationem ab molestiae. Alias libero modi rerum atque perspiciatis sint? Quo eum molestias necessitatibus qui sequi accusantium laborum voluptate commodi!</p>
      </Slide>
      
      <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1600}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In vel exercitationem ab molestiae. Alias libero modi rerum atque perspiciatis sint? Quo eum molestias necessitatibus qui sequi accusantium laborum voluptate commodi!</p>
      </Slide>
    </div>
  )
}

export default Home