import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { useState, useRef } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleProps {
	currentState: typeof defaultArticleState;
	onChange: (state: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({ currentState, onChange }: ArticleProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [state, setState] = useState(currentState);
	const formRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => setIsMenuOpen(!isMenuOpen);

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onChange(state);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setState(defaultArticleState);
		onChange(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text
						as={'p'}
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setState({ ...state, fontFamilyOption: option })
						}
						title='шрифт'
					/>

					<RadioGroup
						name='рАЗМЕР шрифта'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(option) =>
							setState({ ...state, fontSizeOption: option })
						}
						title='рАЗМЕР шрифта'
					/>

					<Select
						selected={state.fontColor}
						options={fontColors}
						onChange={(option) => setState({ ...state, fontColor: option })}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setState({ ...state, backgroundColor: option })
						}
						title='Цвет фона'
					/>

					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={(option) => setState({ ...state, contentWidth: option })}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
