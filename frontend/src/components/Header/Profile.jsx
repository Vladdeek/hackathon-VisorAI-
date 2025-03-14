import { useState } from 'react'
import React from 'react'
import './Profile.style.css'

const Profile = ({ userName, image_path }) => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const toggleSettings = () => {
		setIsSettingsOpen(!isSettingsOpen)
	}

	return (
		<>
			<div
				className='profile flex flex-col absolute right-0 top-4 items-end'
				onClick={toggleSettings}
			>
				<div className='p-con p-3 flex'>
					<div className='p-info-con flex flex-col items-end justify-center'>
						<h1 className='p-user-name'>{userName}</h1>
					</div>
					<img
						src={
							image_path.length !== 0
								? image_path
								: 'https://placehold.co/40x40'
						}
						alt=''
						className='p-image mx-4'
					/>
				</div>
				{isSettingsOpen && (
					<div className='p-settings flex flex-col'>
						<div className='ps-btn flex h-14 p-3 cursor-default select-none items-center'>
							<img src='' alt='' className='psb-img mx-3' />
							<p className='psb-title text-wrap w-42'>Настройки</p>
						</div>
						<div className='ps-btn ps-btn-2 flex h-14 p-3 cursor-default select-none items-center'>
							<img src='' alt='' className='psb-img mx-3' />
							<p className='psb-title text-wrap w-42'>Загруженные файлы</p>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Profile
