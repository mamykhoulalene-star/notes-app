import { useState,useEffect } from 'react';
const Notes=()=>{

const[note,setNote]=useState('')
const[notes,setNotes]=useState(()=>
    JSON.parse(localStorage.getItem('notes') ||'[]')
)
const[search,setSearch]=useState('')
const filterdNotes=notes.filter((n)=>n.note.toLowerCase().includes(search.toLowerCase()))
const[editText,setEditText]=useState('')
const[editId,setEditId]=useState(null)
const CHAR_LIMIT=200
const isOverLimit=note.length>CHAR_LIMIT
const isNearLimit=note.length>CHAR_LIMIT*0.75
const charCount=note.length


useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(notes))
},[notes])

function addNote(){
    setNotes([...notes,{
        id:Date.now(),
        note:note,
        createdAt:new Date().toISOString(),
        updatedAt:null
    }])
    setNote('')
}

function deleteNote(note){
    setNotes(notes.filter((n)=>n.id!==note.id))
}

function handleKeyEnter(e){
if(e.key=='Enter' && !e.shiftKey){
     e.preventDefault()  // Prevent new line
    if (note.trim()) {  // Don't add empty notes
      addNote()
    }
}
}
    function autoResize(e) {
  e.target.style.height = 'auto'  // Reset height
  e.target.style.height = e.target.scrollHeight + 'px'  // Set to content height
}
    
function handleEdit(note){
    setEditText(note.note)
    setEditId(note.id)
}

const handleUpdate=()=>{
    if(editText.trim()!==''){
    setNotes(notes.map((n)=>
        (n.id===editId)?
    {...n,
        id:editId,
        note:editText,
        updatedAt:new Date().toISOString()
    }:n))
setEditId(null)
setEditText('')}
}

function cancelEdit(){
    setEditId(null)
    setEditText('')
}

function timeago(dateString){
    if (!dateString) return''
    
    const date=new Date(dateString)
    const now=new Date()
    const seconds=Math.floor((now-date)/1000)

    if (seconds < 5) return 'Just now'
    if (seconds < 60) return `${seconds}s ago`
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })


}


    return(
<div className='max-w-xl mx-auto p-2 md:p-2 lg:p-2'>
<div className='items-center justify-between 
max-w-2xl mx-auto '>
<h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  My Notes
</h1>
<input className='w-full placeholder-gray-400 placeholder-opacity-75 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' placeholder='Search Notes' value={search}
 onChange={(e)=>setSearch(e.target.value)} />
</div>



<ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
    {

    filterdNotes.map((n)=>{   
        const isEditing=editId===n.id
        
          return <li className='h-full w-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300
         bg-white rounded-xl shadow-xl p-4 mb-4 ' key={n.id}>
        
        <div className='flex justify-between'>
{n.updatedAt? (
    <span className='text-sm text-gray-500' title={`updated at ${new Date(n.updatedAt).toLocaleString()}`}>
    Edit at: {timeago(n.updatedAt)}
</span>
):(
<span className='text-sm text-gray-500' title={`created at ${new Date(n.createdAt).toLocaleString()}`}>
{timeago(n.createdAt)}
</span>)}

        </div>
            {isEditing?(
     <div>        
     <textarea 
                className='w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={editText}
                rows={3} 
                onChange={(e)=>setEditText(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key==='Enter'&&!e.shiftKey){
                        e.preventDefault()
                        handleUpdate()
                    }
                     if (e.key === 'Escape') {
                cancelEdit()
              }
                }}/>
<div className='flex gap-2 mt-2'>
    <button className="flex-1 ml-2 mb-2 py-2 px-2 bg-green-500 text-white rounded-md 
        hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleUpdate}>Save</button>
    <button className="flex-2 ml-2 mb-2 py-2 px-2 bg-gray-500 text-white rounded-md 
        hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={cancelEdit}>Cancel</button>
</div>
</div>
            ):(
        <div>
            <p className='text-lg font-medium text-gray-800'>{n.note}</p> 
            <div className='flex gap-2 mt-2'>
            <button className="flex-1 ml-2 py-1 px-1 bg-red-500 text-white rounded-md 
        hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={()=>deleteNote(n)}>
              Delete
            </button>
            <button className="flex-2 ml-2 py-1 px-1 bg-blue-500 text-white rounded-md 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={()=>handleEdit(n)}>
              Edit
            </button>
            </div>
            </div>
            )}
        </li>
    }            
)}
    </ul>
  
<textarea type="text" 
placeholder="Enter your Note here" 
className="w-full border border-gray-300 rounded-xl shadow-sm 
  focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 p-4 
  resize-none overflow-hidden transition-shadow duration-200 
  hover:shadow-md"
value={note}
onChange={(e)=>{
    setNote(e.target.value)
    autoResize(e)
}
}
rows={4}
cols={15}
onKeyDown={handleKeyEnter}
/>
<div className='flex justify-between items-center'>
<span className={`text-sm ${isOverLimit? 'text-red-500' :isNearLimit? 'text-orange-500': 'text-gray-400'}`}>
{charCount}/{CHAR_LIMIT}
</span>
{isOverLimit && <span className='text-red-500'>Note is over the character limit.</span>}
</div>
<button className="w-full mt-3 py-2.5 px-4 bg-blue-600 text-white rounded-xl 
  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
  disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            onClick={addNote}
            disabled={isOverLimit || note.trim()===''}
            >
            Add
            </button>
  
    </div>
        
    )
}
export default Notes;