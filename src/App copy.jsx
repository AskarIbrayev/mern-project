import {useState, useEffect} from 'react'

const API_BASE = "http://localhost:3001"

function App() {
	const [texts, setTexts] = useState([])
	const [newText, setNewText] = useState('')
	const [changedText, setChangedText] = useState('')
	const [editTextId, setEditTextId] = useState('')
	// const [isEditing, setIsEditing] = useState(false)
	
	useEffect(() => {
		getTexts()
	}, [])
	
	const getTexts = () => {
		fetch(API_BASE + "/texts")
			.then(res => res.json())
			.then(data => setTexts(data))
			.catch(err => console.error("Error: ", err))
	}

	const addText = async () => {
		const data = await fetch(API_BASE + "/text/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text: newText
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
				text: changedText
			})
		}).then(res => res.json());
		setTexts(prevState => prevState.map(item => item._id === id ? {...item, text: changedText} : item))
		setEditTextId('')
	}

	const deleteText = async id => {
		const data = await fetch(API_BASE + "/text/delete/" + id, {
			method: "DELETE"
		}).then(res => res.json())
		setTexts(prev => prev.filter(text => text._id !== data._id))
	}

	const startEditing = (id, oldText) => {
		setEditTextId(id)
		setChangedText(oldText)
	}

	return (
		<div className="App">
			<h1>Please enter text below</h1>
			<input 
				className='text-input'
				type="text"
				value={newText}
				onChange={(event) => setNewText(event.target.value)}
				placeholder="insert text"
			>
			</input>
			<button onClick={() => addText()}>Add</button>
			<div className="text-container">
				{texts.map(item => {
						return (
							<div className='text-item' key={item._id}>
								{item._id === editTextId
								? 
								<span>
									<input value={changedText} onChange={e => setChangedText(e.target.value)}></input> 
									<button onClick={() => editText(item._id)}>OK</button>
								</span>
								: 
								<span>
									{item.text}
									<button onClick={() => startEditing(item._id, item.text)}>EDIT</button>
								</span>
								}
								<button onClick={() => deleteText(item._id)}>DELETE</button>
							</div>	
						)
				}).reverse()}
			</div>
			
		</div>
	);
}


export default App;
