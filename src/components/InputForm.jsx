
const InputForm = ({newText, setNewText, addText}) => {
    return (
        <div className="input-form">
            <h3>Please enter text below</h3>
            <textarea 
                className='text-input'
                type="text"
                value={newText}
                onChange={(event) => setNewText(event.target.value)}
                placeholder="Insert text"
            >
            </textarea>
            <button onClick={() => addText()} className="btn btn-add">Add</button>
        </div>
    )
}
export default InputForm