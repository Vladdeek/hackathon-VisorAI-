import React, { useState } from 'react'
import './FileUpload.css'

const FileUpload = () => {
	const [image, setImage] = useState(null)
	const [dragging, setDragging] = useState(false)

	// Обработчики для перетаскивания файлов
	const handleDragIn = e => {
		e.preventDefault()
		setDragging(true)
	}

	const handleDragOut = e => {
		e.preventDefault()
		setDragging(false)
	}

	const handleDrop = e => {
		e.preventDefault()
		setDragging(false)
		const file = e.dataTransfer.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImage(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	// Обработчик для кнопки выбора файла
	const handleFileChange = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImage(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<>
			<div
				className={`flex flex-col items-center justify-center w-9/12 h-150 mx-auto my-10 upload-zone ${
					dragging ? 'dragging' : ''
				}`}
				onDragOver={e => e.preventDefault()}
				onDragEnter={handleDragIn}
				onDragLeave={handleDragOut}
				onDrop={handleDrop}
			>
				<div className='upload-zone-content my-4'>
					{image ? (
						<img src={image} alt='Uploaded preview' className='w-1/2 mx-auto' />
					) : (
						<p>Перетащите файл сюда или выберите файл для загрузки</p>
					)}
				</div>
				<input
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					id='file-input'
					style={{ display: 'none' }}
				/>
				<label htmlFor='file-input my-4' className='upload-btn'>
					{image ? 'Выбрать другое фото' : 'Выбрать фото'}
				</label>
			</div>
			<button
				className='func-btn mx-auto flex mb-10'
				style={{ visibility: image ? 'visible' : 'hidden' }}
			>
				Обработать
			</button>
		</>
	)
}

export default FileUpload
