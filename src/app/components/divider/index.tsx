import React from 'react';
import styled from 'styled-components';

export interface IDividerProps {
	width?: string;
	height?: string;
	bg?: string;
}

const toCssUnit = (value?: string) =>
	value && (value.endsWith('%') || value.endsWith('px')) ? value : `${value}px`;

const DividerComponent = styled.span<IDividerProps>`
	display: flex;
	min-width: ${({ width }) => toCssUnit(width)};
	min-height: ${({ height }) => toCssUnit(height)};
	background: ${({ bg }) => `${bg}`};
`;

function Divider(props: IDividerProps) {
	return <DividerComponent {...props} />;
}

export default Divider;
