import React from 'react';
import Projections from '../../src/components/projections';
import {
	useGetNFLQuery,
} from '../../src/redux/slices/apiSlice';

const NFL = () => {
	const {
		data: games,
		error,
		isLoading,
	} = useGetNFLQuery();

	return <Projections games={games}/>;
};

export default NFL;
