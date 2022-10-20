import React from 'react';
import Projections from '../../src/components/projections';
import {
	useGetNBAQuery,
} from '../../src/redux/slices/apiSlice';

const NBA = () => {
	const {
		data: games,
		error,
		isLoading,
	} = useGetNBAQuery();

	return <Projections games={games}/>;
};

export default NBA;
