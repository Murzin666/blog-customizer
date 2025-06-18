import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import { CSSProperties, useState } from 'react';


import styles from '../../styles/index.module.scss';

export const App = () => {
	const [state, setState] = useState(defaultArticleState);

	const handleChange = (newState: typeof defaultArticleState) => {
		setState(newState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={handleChange} currentState={state} />
			<Article />
		</main>
	);
};