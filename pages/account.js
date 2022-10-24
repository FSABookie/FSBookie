import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {useSession, signOut} from 'next-auth/react'
import { BiLogIn, BiLogOut } from "react-icons/bi";


const Container = styled.div `
    color: white;
    .body{
        display: flex;
        flex-direction: column;
        row-gap: 2em;
        align-items: center;
        padding-top: 25%;

        .setting {
            background-color: #242424;
            padding: 3%;
            width: 70%;
            padding-left: 5%;
            height: 10%;
        }

     .logout {
        display: flex;
        flex-direction: row;
        column-gap: 0.4em;
        .logoutIcon {
            padding-top: 10%;
        }
     }
    }
`

const LinkContainer = styled.div `
`





function account() {
    
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/sportsbook" });
      };
    const {data:session} = useSession()
    console.log(session)
  return (
     <Container>
        {session ? (
            <div className="body">
                <div className="userEmail setting">
                    {session.user.email}
                </div>
                <div className="Name setting">
                    {session.user.name}
                </div>
                <div className="userName setting">
                    {session.user.username}
                </div>
                <div className="logout setting">
                
                    <div>
                        Logout
                    </div> 
                    <Link href="/sportsbook">
                    <LinkContainer onClick={handleLogout}>
                    <div className="logoutIcon">
                    <BiLogOut  />
                    </div>
              </LinkContainer>
            </Link>
                </div>
            </div>
        ):(
        <>
        <p>
            please login or create an account
        </p>
        </>
        )}
    </Container>
  )
}

export default account