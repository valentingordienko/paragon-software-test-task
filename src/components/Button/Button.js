import React, {memo, useCallback} from "react";

import "./Button.css";

const mainCssClass = "button";

function Button ({className, id, caption, onClick}) {

	const handleClick = useCallback(()=>{
		if(onClick) {
			onClick(id);
		}
	}, [id, onClick])

	return <button className={`${className} ${mainCssClass}`} onClick={handleClick}>{caption}</button>
}

export default memo(Button);