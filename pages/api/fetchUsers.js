import {client} from '../../lib/sanity'

const getUserInfo = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: 'error', data:error.message})
    }
}