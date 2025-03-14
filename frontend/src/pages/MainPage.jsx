import { useState } from 'react'
import '../style/MainPage.style.css'
import Header from '../components/Header/Header'
import FileUpload from '../components/FileUpload/FileUpload'
import AuthModal from '../components/AuthModal/AuthModal'

const MainPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false) // Состояние для управления отображением модального окна

	const handleOpenModal = () => {
		setIsModalOpen(true) // Открыть модальное окно
	}

	const handleCloseModal = () => {
		setIsModalOpen(false) // Закрыть модальное окно
	}

	return (
		<>
			{/* Передаем состояние и функцию для закрытия в AuthModal */}
			{isModalOpen && <AuthModal onClose={handleCloseModal} />}
			<Header onOpenModal={handleOpenModal} />{' '}
			{/* Передаем функцию открытия окна в Header */}
			<hr className='w-8/9 mx-auto' />
			<FileUpload />
			<hr className='w-8/9 mx-auto' />
			<hr className='w-8/9 mx-auto' />
		</>
	)
}

export default MainPage
