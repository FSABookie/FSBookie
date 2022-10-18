import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import React, { useRef } from "react";
import Link from "next/link";

// const OuterContainer = styled.div`
// margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Poppins', sans-serif;
// body {
//     background: linear-gradient(45deg, #8500ff, #5acaff);
//     height: 100vh;
// }
// `

// // const GlobalStyle = createGlobalStyle`
// //  margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Poppins', sans-serif;
// //     body {
// //     background: linear-gradient(45deg, #8500ff, #5acaff);
// //     height: 100vh;
// //  }
// // `

// const Container = styled.div`
//     position: absolute;
//     /* top: 10%;
//     left: 10%;
//     right: 10%;
//     bottom: 10%;
//     border-radius: 10px; */
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: url('/p404.png'), #151729;
//     box-shadow: 0 15px 30px rgba(0, 0, 0, .5);
// `

const Content = styled.div`
    margin: 0;
    padding: 0;
    padding-top: 20%;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    position: absolute;
    /* top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    border-radius: 10px; */
    width: 100%;
    height: 100%;
    /* display: flex; */
    justify-content: center;
    align-items: center;
    background: url('/p404.png'), #151729;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .5);
    text-align: center;
    /* display: inline-block; */
    h2 {
        font-size: 12vw;
        color: #fff;
        line-height: 0em;
    }
    h4 {
        position: relative;
        font-size: 1.5em;
        margin-bottom: 20px;
        color: #111;
        background: #fff;
        font-weight: 300;
        padding: 10px 20px;
        display: inline-block;
    }
    p {
        color: #fff;
        font-size: 1.2em;
    }
    a {
        position: relative;
        display: inline-block;
        padding: 10px 25px;
        background: #ff0562;
        color: #fff;
        text-decoration: none;
        margin-top: 25px;
        border-radius: 25px;
        border-bottom: 4px solid #d00d56;
    }
`

//const containerRef = useRef();

// function moveBackground(e) {
//     var x = e.clientX;
//     var y = e.clientY;
//     containerRef.style.backgroundPositionX = x + 'px';
//     containerRef.style.backgroundPositionY = y + 'px';
// }

export default function Error() {
    return(
                <Content>
                    <h2>404</h2>
                    <h4>Oops! Page NOT Found</h4>
                    <p>The page you were looking for doesn&apos;t exist. You may have mistyped
                    the address or the page may have moved.
                    </p>
                    <Link href='/'>Back To Home</Link>
                </Content>
    )
}