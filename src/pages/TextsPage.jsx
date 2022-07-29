import {useState, useEffect} from 'react'
import TextList from '../components/TextList'
import InputForm from '../components/InputForm'

const API_BASE = "http://localhost:3001"

function TextsPage() {
	const [texts, setTexts] = useState([])
	const [newText, setNewText] = useState('')
	const [changedText, setChangedText] = useState({id:'', text:''})
	const [isLoading, setIsLoading] = useState(false)
	
	useEffect(() => {
		getTexts()
	}, [])
	
	const getTexts = async () => {
		setIsLoading(true)
		await fetch(API_BASE + "/texts")
			.then(res => res.json())
			.then(data => setTexts(data))
			.catch(err => console.error("Error: ", err))
		setIsLoading(false)
	}

	const addText = async () => {
		const data = await fetch(API_BASE + "/text/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text: newText,
				timestamp: Date.now()
			})
		}).then(res => res.json())
		setTexts([...texts, data])
		setNewText('')
	}

	const editText = async id => {
		const updatedText = await fetch(API_BASE + "/text/update/" + id, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text: changedText.text
			})
		}).then(res => res.json());
		setTexts(prevState => prevState.map(item => item._id === id ? {...item, text: changedText.text} : item))
		setChangedText({...changedText,  id: '', text: ''})
	}

	const deleteText = async id => {
		alert("Are you sure you want to delete?")
		setIsLoading(true)

		const data = await fetch(API_BASE + "/text/delete/" + id, {
			method: "DELETE"
		}).then(res => res.json())
		setTexts(prev => prev.filter(text => text._id !== data._id))
		setIsLoading(false)

	}

	return (
		<div className="page">
			<h1 className='page-title'>List of texts</h1>
			<InputForm 
				newText={newText}
				setNewText={setNewText}
				addText={addText}
			/>
			{
				isLoading ?
				'Loading...'
				:
				<TextList 
					texts={texts}
					changedText={changedText}
					setChangedText={setChangedText}
					editText={editText}
					deleteText={deleteText}
				/>
			}
			
		</div>
	);
}


export default TextsPage;
