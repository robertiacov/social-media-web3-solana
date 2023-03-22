import {client} from '../../lib/sanity'

const createUserOnSanity = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: 'error', data:error.message})
    }
}