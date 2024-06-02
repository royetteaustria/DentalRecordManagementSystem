import express from 'express'
import {
    GetSingleClient,
    addClient,
    updateClients,
    ClientList
} from '../../controller/clients/clients.js'

const router = express.Router()

router.post('/', addClient)
router.get('/', ClientList)
router.put('/update/:id', updateClients)
router.get('/info/:id', GetSingleClient)

export default router;