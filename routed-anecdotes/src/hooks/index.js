
import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'
export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    };

    return {
        type,
        value,
        onChange,
        reset
    }
}


export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await anecdoteService.getAll()
            setAnecdotes(res)
        }
        fetchData()
    }, [])


    async function addAnecdote(data) {
        const returnedObject = await anecdoteService.createNew(data)
        setAnecdotes(anecdotes.concat(returnedObject))
    }

    async function deleteAnecdote(id) {
        await anecdoteService.deleteOne(id)
        setAnecdotes(anecdotes.filter((data) => data.id !== id))

    }


    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    }
}