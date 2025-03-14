import { useState } from 'react'
import '../style/MainPage.style.css'
import Header from '../components/Header/Header'
import FileUpload from '../components/FileUpload/FileUpload'
import AuthModal from '../components/AuthModal/AuthModal'
import LastUploadComponent from '../components/LastUploadComponent/LastUploadComponent'

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
			<p className='main-title text-center my-10'>Последние загруженные</p>
			<LastUploadComponent
				image_path='/img/recognized_image1.jpg'
				title='test1'
			/>
			<LastUploadComponent
				image_path='/img/2025-02-02 02.16.41.jpg'
				title='test2'
			/>
			<LastUploadComponent
				image_path='/img/Снимок экрана 2025-03-06 в 15.20.16.png'
				title='test3'
			/>
			<hr className='w-8/9 mx-auto' />
		</>
	)
}

export default MainPage
