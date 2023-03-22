import {client} from '../../lib/sanity'

const getUserInfo = async (req, res) => {
    try {
        const query = `
        *[_type == "users"]{
            name,
            walletAddress,
            profileImage,
        }
        `
    } catch (error) {
        res.status(500).send({message: 'error', data:error.message})
    }
}

export default getUserInfo