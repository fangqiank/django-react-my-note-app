import React from 'react'

export const Header = ({ text, bgColor, textColor }) => {
	const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
	}

	return (
		<header style={headerStyles}>
			<div className='header-container'>
				<h2>{text}</h2>
			</div>
		</header>
	)
}

Header.defaultProps = {
  text: 'Note App presented by React & Django',
  bgColor: ' #202142',
  textColor: '#fff',
}
