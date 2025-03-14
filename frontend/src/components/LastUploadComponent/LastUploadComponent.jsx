import './LastUploadComponent.css'

const LastUploadComponent = ({ image_path, title }) => {
	return (
		<div className='last-up-comp flex h-20 justify-between items-center px-4 py-2 w-9/12 mx-auto my-5'>
			<img src={image_path} alt='' className='small-img h-10/12 w-auto' />
			<p className='luc-title'>{title}</p>
			<button className='download-btn px-4 h-2/3'>Загрузить</button>
		</div>
	)
}

export default LastUploadComponent
