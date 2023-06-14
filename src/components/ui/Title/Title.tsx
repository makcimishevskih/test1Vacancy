import css from './Title.module.css';
import { createElement } from 'react';

interface IProps {
	tag: string;
	text: string;
	className: string;
}

function Title({ tag, className, text }: IProps) {
	const titleClasses = `${css[className]} ${css[tag]}`;

	return createElement(tag, { className: titleClasses }, text);
}

export default Title;
