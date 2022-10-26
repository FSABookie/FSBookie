import React from 'react';
import Projections from '../../src/components/projections';
import {
	useGetMLBQuery,
} from '../../src/redux/slices/apiSlice';

const MLB = () => {
	const {
		data: games,
		error,
		isLoading,
	} = useGetMLBQuery();

	return <Projections games={games} sport={'MLB'}/>;
};

export default MLB;
