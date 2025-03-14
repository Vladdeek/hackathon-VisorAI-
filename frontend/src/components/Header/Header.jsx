import './Header.css'
import Profile from './Profile'

const Header = ({ onOpenModal }) => {
	const user = true // Пока что нет пользователя
	const userPhoto = ''

	return (
		<header className='flex relative justify-between items-center w-11/12 h-25 px-10 mx-auto my-8'>
			<img className='header-logo' src='assets/images/logo.svg' alt='Logo' />
			{user ? (
				<Profile userName='Гриша' image_path='' />
			) : (
				<button className='header-auth-btn' onClick={onOpenModal}>
					Войти
				</button>
			)}
		</header>
	)
}

export default Header
