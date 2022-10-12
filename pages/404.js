import styled from "styled-components";

const OuterContainer = styled.section`
margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
body {
    background: linear-gradient(45deg, #8500ff, #5acaff);
    height: 100vh;
}
`

const Container = styled.div`
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('p404.png'), #151729;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .5);
`

const Content = styled.div`

`
export default function Error() {
    return(
            <>
            <head>
            <title>404 Page Error</title>
            </head>
            <body>
                <Container>
                <Content>
                    <h2>404</h2>
                    <h4>Oops! Page NOT Found</h4>
                    <p>The page you were looking for doesn't exist. You may have mistyped
                    the address or the page may have moved.
                    </p>
                    <a href='/'>Back To Home</a>
                </Content>
                </Container>
            </body>
            </>
    )
}