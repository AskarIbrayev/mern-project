
const InputForm = ({newText, setNewText, addText}) => {
    return (
        <div>
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
        </div>
    )
}
export default InputForm