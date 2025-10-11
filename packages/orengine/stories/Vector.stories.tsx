import React, { useState } from 'react';

import { Vector } from '../components/composites/Vector';

export const Basic = () => {

	const [ value, setValue ] = useState( [ 0, 0, 0 ] );
	return <Vector value={value} onChange={( value ) => {

		setValue( [ value.x, value.y, value.z ] );

	}} />;

};

export default {
	title: 'orengine/Vector',
	component: Vector,
};
