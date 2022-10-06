import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { signOut, useSession } from 'next-auth/react';
// react-icons
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { GiMeatCleaver } from 'react-icons/gi';
import { BiLogIn, BiLogOut } from 'react-icons/bi';


const headerMainHeight = '7em';
const headerTopHeight = '2em';

const HeaderContainer = styled.div`
	color: white;
	height: ${headerMainHeight + headerTopHeight};
	h1,
	p {
		:hover {
			color: lightgray;
		}
	}
`;
const HeaderTop = styled.div`
	height: ${headerTopHeight};
	background-color: black;

	display: flex;
	justify-content: flex-end;
	align-items: center;

	* {
		margin: auto 0;
	}
	p {
		margin-top: 0.27em;
		padding: 0 0.4em 0.15em;
	}
`;

const mobileLogoTextWidth = "3.62em";

const HeaderMain = styled.div`
	margin-top: -1px;
	width: 100%;
	height: ${headerMainHeight};
	background-color: #8b0000;

	@media screen and (min-width: 750px) {
		background-color: #7b0000;

		> div {
			width: 750px;
			margin: auto;
			background-color: #8b0000;
		}
	}

	> div {
		h1 {
			margin-top: 0.13em;
		}
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.headerIconButton {
		background-color: #7b0000;
		width: calc(${headerMainHeight} - 0.5em);
		height: ${headerMainHeight};

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.headerIconButton:active {
		background-color: #660000;
	}
	/* #headerLogo {
    width: calc(${headerMainHeight} + ${mobileLogoTextWidth});
    padding-left: 0.25em;

    h1 {
      font-size: 1em;
      width: ${mobileLogoTextWidth};
      margin: 0 0.4em 0 0.5em;
    }
  } */
	.productType {
		font-size: 1.4em;
		padding: 0 0.2em;
		/* margin: 0 0.8em; */
	}

	#headerMainCenter {
		text-align: center;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;

		#siteTitle {
			width: fit-content;
			margin: 0.05em auto 0.15em;
			font-size: 2.1em;
			flex: 2 2 200%;
			border-bottom: 1px solid white;
		}
	}

	@media screen and (min-width: 800px) {
		// should expand logo to be wider, maybe at smaller width?
	}
`;

const LinkContainer = styled.div`
	display: flex;
	align-items: center;
`;

const searchBarWidth = '15em';

const SearchContainer = styled.div`
	position: absolute;
	width: 100%;
	height: calc(100% - 6em);
	top: ${headerMainHeight + headerTopHeight};
	z-index: 50;

	transition: background-color 0.2s;
	transition: opacity 0.2s;
	background-color: rgba(50, 50, 50, 0.4);

	padding-top: 1.2em;
	input {
		font-size: 1.1em;
		top: 1em;
		width: ${searchBarWidth};
		margin: 0 auto;
	}

	display: flex column;
	justify-content: center;
	align-items: center;
	text-align: center;

	.searchProductList {
		width: fit-content;
		margin: 0 auto;
		color: black;
		background-color: white;

		* {
			padding: 0.3em 0.7em;
			&:nth-child(even) {
				background-color: rgb(238, 238, 238);
			}
		}
	}

	&.hide {
		z-index: -100;
		opacity: 0;
		background-color: rgba(0, 0, 0, 0);
	}
`;

//COMPONENT STARTS HERE
function Header() {
	const [isSearchOpen, toggleSearch] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	// const { data: blah } = useGetSingleUserQuery(user?.id)

	// const [getUser] = useGetSingleUserQuery();

	const dispatch = useDispatch();

	const { data: session } = useSession();

	console.log(session);


	let userStatusLink = '/login';
	if (typeof window !== 'undefined') {
		if (session) {
			userStatusLink = '/account';
		}
	}

	const handleLogout = () => {
		Router.push('/');
	};
	const searchRef = useRef();
	const inputRef = useRef();

	const toggle = (e) => {
		const target = e.target.tagName;
		if (target === 'DIV' || target === 'svg' || target === 'path') {
			toggleSearch(!isSearchOpen);
			searchRef.current.classList.toggle('hide');
			setSearchTerm('');
			inputRef.current.focus();
		} else if (e.target.tagName === 'P') {
			searchRef.current.classList.add('hide');

			setTimeout(() => {
				toggleSearch(false);
				setSearchTerm('');
			}, 300);
		}
	};

	// if we want to hide search when user switch pages, maybe should add 'isSearching' to redux store
	// also need to allow user to exit out by clicking elsewhere
	return (
		<HeaderContainer>
			<HeaderTop className='hfLinks'>
				{session ? (
					<>
						{/* account link - displayed as email */}
						<Link href={userStatusLink}>
							<LinkContainer>
								<FaUser />
								<p>{session.user.email}</p>
							</LinkContainer>
						</Link>
						{/* logout link */}
						<Link href='/'>
							<LinkContainer onClick={handleLogout}>
								<BiLogOut />
								<p>Logout</p>
							</LinkContainer>
						</Link>
					</>
				) : (
					<>
						<Link href='/login'>
							<LinkContainer>
								<BiLogIn />
								<p>Login</p>
							</LinkContainer>
						</Link>
					</>
				)}
				{/* {isLoggedIn && usersCart ? (
					<Link href='/cart'>
						<LinkContainer>
							<FaShoppingCart />
							<p>{`Cart (${usersCart.lineItems?.length})`}</p>
						</LinkContainer>
					</Link>
				) : (
					<Link href='/cart'>
						<LinkContainer>
							<FaShoppingCart />
							<p>{`Cart (${cart.length})`}</p>
						</LinkContainer>
					</Link>
				)} */}
			</HeaderTop>

			<SearchContainer className='hide' ref={searchRef} onClick={toggle}>
				<input
					type='text'
					className='search'
					ref={inputRef}
					placeholder='Search...'
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
					value={searchTerm}
				></input>
				<div className='searchProductList'>
					{/* {!isLoading &&
						!isError &&
						products
							.filter((product) => {
								if (searchTerm === '') {
									return false;
								} else {
									return product.name
										.toLowerCase()
										.includes(searchTerm.toLowerCase());
								}
							})
							.map((product) => (
								<Link
									href={`/${product.type}/${product.id}`}
									key={product.id}
								>
									<p onClick={toggle}>{product.name}</p>
								</Link>
							))} */}
				</div>
			</SearchContainer>
		</HeaderContainer>
	);
}

// disabling SSR for the header, because its contents depend on the localStorage
export default Header;
