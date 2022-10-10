import React, {useRef, useState} from 'react'
import styled from 'styled-components'


const Page = styled.div `
height: 100vh;
@media only screen and (min-width: 768px){
    background:blue;
}

button {

}
`

const Menu = styled.div `
    overflow: hidden;

    a {display:block;}
   
`

  
function Sportsbook() {

    const mySidenavRef = useRef()
    const [isOpen, setOpen] = useState(false)

    function toggleNav() {
        if (isOpen) {
            setOpen(false)
            mySidenavRef.current.style.width = '0px'
    }else {
        mySidenavRef.current.style.width = '250px'
        setOpen(true)
    }
    console.log('dickcheese')
    
}

  return (
    <Page>
 <Menu ref={mySidenavRef} className="sidenav">
  <a href="javascript:void(0)" onClick={toggleNav}>&times;</a>
  <a href="#">Home</a>
  <a href="#">My Bets</a>
  <a href="#">How To Bet</a>
  <a href="#">Forum</a>
  <a href="#">Projections</a>
</Menu>

<button  onClick={toggleNav}>&#9776;</button>
    </Page>
  )
}

export default Sportsbook