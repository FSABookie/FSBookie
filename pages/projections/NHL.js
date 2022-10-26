import React from 'react';
import Projections from '../../src/components/projections';
import {
	useGetNHLQuery,
} from '../../src/redux/slices/apiSlice';

const NHL = () => {
	const {
		data: games,
		error,
		isLoading,
	} = useGetNHLQuery();

	return <Projections games={games} sport={'NHL'}/>;
};

export default NHL;
