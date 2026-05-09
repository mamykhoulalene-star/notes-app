import { useState,useEffect } from 'react';
const Notes=()=>{

const[note,setNote]=useState('')
const[notes,setNotes]=
    useState(()=>JSON.parse(localStorage.getItem('notes')||'[]')
)

useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(notes))
},[notes])

function addNote(){

    setNotes([...notes,{id:Date.now(),note}])
    setNote('')

}

function deleteNote(note){
    setNotes(notes.filter((n)=>n.id!==note.id))
}

    return(
        <div>
            <h1>Notes</h1>
<input type="text" 
placeholder="Enter your Note here" 
className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
value={note}
onChange={(e)=>setNote(e.target.value)}
/>


<button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
onClick={addNote}
>
              Add Note
            </button>
<div className="mt-4">
    {notes.map((n)=>{
        return <div>
            <li key={n.id}>{n.note}
                <button className="ml-2 mb-2 py-2 px-2 bg-red-500 text-white rounded-md 
        hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={()=>deleteNote(n)}
        >
          Delete
        </button>
            </li>
        
        </div>
    })}
    
    </div>

          </div>
        
    )
}
export default Notes;