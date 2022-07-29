

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
                                <textarea className="textarea-edit" value={changedText.text} onChange={e => setChangedText({...changedText,text: e.target.value})}></textarea> 
                                <button className="btn btn-submit_edit" onClick={() => editText(item._id)}>OK</button>
                            </span>
                            : 
                            <span>
                                {item.text === '' ? '--empty field--' : item.text}
                                <button className="btn-edit" onClick={() => setChangedText({...changedText, id: item._id, text: item.text})}>EDIT</button>
                            </span>
                            }
                            <button className="btn-delete" onClick={() => deleteText(item._id)}>&#10060;</button>
                            <span className="date-posted">
                                {`Date: ${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`}
                            </span>
                        </div>	
                    )
				}).reverse()}
			</div>

        )
    }
    else return <div>The list is empty</div>
}

export default TextList