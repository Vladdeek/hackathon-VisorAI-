import { useState } from 'react'
import './AuthModal.css'

const AuthModal = ({ onClose }) => {
	const [isLogin, setIsLogin] = useState(true)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// Обработчик отправки формы
	const handleSubmit = async e => {
		e.preventDefault()

		const url = isLogin ? '/api/login' : '/api/register'
		const body = JSON.stringify({ username, password })

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: body,
			})

			if (response.ok) {
				const data = await response.json()
				console.log('Успех:', data)
			} else {
				const errorData = await response.json()
				console.error('Ошибка:', errorData)
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error)
		}
	}

	return (
		<div className='fixed inset-0 w-screen flex justify-center items-center z-50'>
			{/* Задний фон, который тоже будет закрывать модальное окно при клике */}
			<div
				className='fixed inset-0 bg-black opacity-50'
				onClick={onClose}
			></div>

			{/* Форма модального окна */}
			<form className='auth-modal flex flex-col w-1/4 px-10 py-15 bg-white rounded-lg shadow-lg'>
				{/* Кнопка закрытия */}
				<img
					className='close-btn cursor-pointer'
					src='./assets/images/cross.svg'
					alt='Close'
					onClick={onClose}
				/>
				<p className='auth-title text-center mb-10'>
					{isLogin ? 'Авторизация' : 'Регистрация'}
				</p>
				<p className='mx-1'>Имя пользователя</p>
				<input
					className='text-input w-full mx-auto px-2 py-2 border rounded-md'
					type='text'
					placeholder='megapro'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<p className='mx-1'>Пароль</p>
				<input
					className='text-input w-full mx-auto px-2 py-2 border rounded-md'
					type='password'
					placeholder='пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button
					className='submit-btn mx-auto my-5 py-2 px-4 bg-blue-500 text-white rounded-md'
					type='submit'
				>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
				<p
					className='auth-link text-center'
					onClick={() => setIsLogin(!isLogin)}
				>
					{isLogin
						? 'Нет аккаунта? Зарегистрируйтесь'
						: 'Есть аккаунт? Войдите'}
				</p>
			</form>
		</div>
	)
}

export default AuthModal
