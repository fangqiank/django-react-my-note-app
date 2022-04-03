import React, {useContext, useState} from 'react'
import NoteContext from '../context/NoteContext'
import {Link} from 'react-router-dom'
import { confirm } from "react-confirm-box"
import Modal from 'react-modal'

const customStyles = {
  content: {
		width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
		position: 'relative',
  },
}

const optionsWithClonOnOverlayclick = {
  closeOnOverlayClick: true
}

Modal.setAppElement('#root')

let noteId = 0

export const NotesList = () => {

	const {notes, isLoading, deleteNote, addNote, updateNote} = useContext(NoteContext)

	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [modalIsOpen, setModalIsOpen] = useState(false)

	if(!isLoading && (!notes || notes.length === 0)) {
		return (
			<div>No notes yet</div>
		)
	}

	const openModal = () => setModalIsOpen(true)
  const closeModal = () => {
		noteId = 0
		setTitle('')
		setBody('')
		setModalIsOpen(false)
	}

	const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
	}

	const handleDelete = async (options, id) => {
    const result = await confirm(`Are you sure to delete note ${id}?`, options);
    if (result) {
			deleteNote(id)
      return
    }
  }

	const handleSubmit = e =>{
		if(noteId === 0){
			e.preventDefault()
			
			// noteId = 0
			addNote({title, body})
			// setTitle('')
			// setBody('')
			closeModal()
		}else{
			updateNote(noteId, {title, body})
			// noteId = 0
			// setTitle('')
			// setBody('')
			closeModal()
		}

	}


	return (
		<>
			<div className='notes'>
				<div className="notes-header">
					<h2 className="notes-title">&#9782; Notes</h2>
					<p className="notes-count">{notes.length}</p>
				</div>
					
				<div className="notes-list">
					{notes.map(note => (
							<div className='notes-list-item' key={note.id}>
								<Link to={`notes/${note.id}`}>
									<h3>{note.title}</h3>
								</Link>	

								<p>
									<span>{formatDate(note.updatedAt)}</span>
									{/* {note.body} */}
									<span style={{'marginLeft': '20px'}}>
										<i 
											className="fa-solid fa-trash-can" 
											style={{'color': '#C70039'}}
											onClick={() => handleDelete(optionsWithClonOnOverlayclick, note.id)}
										></i>
									</span>
									<span style={{'marginLeft': '5px'}}>
										<i 
											className="fa-solid fa-pen"
											style={{'color': '#0082C7'}}
											onClick={() => {
												noteId = note.id
												setTitle(note.title)
												setBody(note.body)
												openModal()
											}}
										>

										</i>
									</span>
								</p>
							</div>
					))}
				</div>
			</div>
			
			<button className='floating-button' onClick={openModal}>
				<span style ={{fontSize:'30px'}}>
				<i className="fa-solid fa-plus"></i>
				</span>
			</button>

			<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel='Add note'
		>
			<h2>Add Note</h2>
			<button className='btn-close' onClick={closeModal}>X</button>

			<form onSubmit={handleSubmit}>
			<div className='form-group'>
					<input 
						type='text'
						name="title" 
						id="title"
						className='form-control'
						placeholder='Enter the title here'
						value={title}
						onChange = {e => setTitle(e.target.value)}
					/>
				</div>

				<div className='form-group'>
					<textarea 
						name="body" 
						id="body"
						className='form-control'
						placeholder='Enter your content here'
						value={body}
						onChange = {e => setBody(e.target.value)}
					></textarea>
				</div>

				<div className='form-group'>
					<button className='btn' type='submit' >
						Submit
					</button>
				</div>
			</form>
	</Modal>
	</>
	)
}
