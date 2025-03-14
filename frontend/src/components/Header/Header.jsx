const Header = () => {
	const user = true

	return (
		<header>
			<img className='header-logo' src='assets/images/logo.svg' alt='Logo' />
			{user ? (
				<img src='' alt='Profile' className='header-profile-photo' />
			) : (
				<button className='header-auth-btn'>Войти</button>
			)}
		</header>
	)
}

export default Header
