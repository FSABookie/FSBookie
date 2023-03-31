import React from 'react'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import QRcode from '../public/fsabookieQR.png';
import Image from 'next/image';


const Container = styled.div`
    @media (min-width: 850px) {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-direction: column;
    }
`

const Orderconfirmed = (props) => {
    const router = useRouter();
    const {
        query: { data },
        } = router;
    console.log('Before Parse', data);
    // console.log('PARSED', JSON.parse(data))
    // const order = JSON.parse(props.router.query.data)
    // console.log(order);
  return (
    <Container>
        <Image src={QRcode}/>
        <Image src={QRcode}/>
        <Image src={QRcode}/>
    </Container>

  )
}

export default Orderconfirmed