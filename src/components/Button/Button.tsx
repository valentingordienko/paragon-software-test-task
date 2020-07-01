import React, {memo, useCallback} from "react";

import "./Button.css";

const mainCssClass = "button";

interface IButtonProps {
	className?: string
	caption: string,
	id: string,
	onClick?: (id: string) => void
}

const Button: React.FC<IButtonProps> = ({className, id, caption, onClick}) => {

 	const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>)=>{
		if(onClick) {
			onClick(id);
		}
	}, [id, onClick])

	return <button className={`${className || ''} ${mainCssClass}`} onClick={handleClick}>{caption}</button>
}

export default memo(Button);