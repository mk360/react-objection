import React from "react"
import classs from "classnames"
const Modal = ({ handleClose, show, children }) => {
	let classss = classs({
		modal: true,
		"display-block": show,
		"display-none": !show
	})
	return (
		<div id="text" className={classss}>
			<section className="modal-main">
				{children}
			</section>
		</div>
	)
}

export default Modal
