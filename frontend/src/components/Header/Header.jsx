import './Header.css'

const Header = ({ onOpenModal }) => {
	const user = false // Пока что нет пользователя
	const userPhoto = ''

	return (
		<header className='flex justify-between items-center w-11/12 h-25 px-10 mx-auto my-8'>
			<img className='header-logo' src='assets/images/logo.svg' alt='Logo' />
			{user ? (
				<img
					src={
						userPhoto.length === 0 ? 'https://placehold.co/50x50' : userPhoto
					}
					alt='Profile'
					className='header-profile-photo'
				/>
			) : (
				<button className='header-auth-btn' onClick={onOpenModal}>
					Войти
				</button>
			)}
		</header>
	)
}

export default Header
