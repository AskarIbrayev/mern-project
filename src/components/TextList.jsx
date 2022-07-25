

const TextList = ({texts, changedText, setChangedText, editText, deleteText}) => {
    if (texts.length){
        return (
            <div className="text-container">
				{texts.map(item => {
                    const date = new Date(Number(item.timestamp))
                    return (
                        <div className='text-item' key={item._id}>
                            {item._id === changedText.id
                            ?
                            <span>
                                <input value={changedText.text} onChange={e => setChangedText({...changedText,text: e.target.value})}></input> 
                                <button onClick={() => editText(item._id)}>OK</button>
                            </span>
                            : 
                            <span>
                                {item.text === '' ? '--empty field--' : item.text}
                                <button onClick={() => setChangedText({...changedText, id: item._id, text: item.text})}>EDIT</button>
                            </span>
                            }
                            {`Date: ${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`}
                            <button onClick={() => deleteText(item._id)}>DELETE</button>
                        </div>	
                    )
				}).reverse()}
			</div>

        )
    }
}

export default TextList