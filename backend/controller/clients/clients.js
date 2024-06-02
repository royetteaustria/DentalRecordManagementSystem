import Client from "../../model/Clients/Client.js";

const addClient = (req, res) => {
    Client.create(req.body)
    .then((clients) => {
        res.json({
            message:"Succesfully add client",
            clients,
        });
    })
    .catch((err) => {
        res.status(404).json({
          message: "Failed to add client",
          error: err.message,
        });
      });
}

const ClientList = (req, res) => {
    Client.find()
    .then((clients) => {
        if (clients.length === 0) {
            return res.json({ message: "No clients found" });
        }
        return res.status(200).json(clients);
    })
    .catch((err) => {
        res.status(500).json({ message: "Failed to retrieve client", error: err.message });
    });
}

const updateClients = (req, res) => {
    const id = req.params.id;
    Client.findOneAndUpdate({_id: id}, {
        MedicalHistory: req.body.MedicalHistory,
        PaymentStatus: req.body.PaymentStatus,
        DownPayment:req.body.DownPayment,
        ClientStatus:req.body.ClientStatus
    })
    .then((Clients) => {
        console.log({ Clients })
        return res.json({
            message: "Successfully update Client",
            Clients,
        })
    })
    .catch((err) => {
        res.status(404).json({
            message: "Cant be update Client",
            error: err.message,
        })
    })
}

const GetSingleClient = (req, res) => {
    const id = req.params.id;
    Client.findById({_id:id})
    .then(client => res.json(client))
    .catch(err => res.json(err))
}

export {
    GetSingleClient,
    addClient,
    updateClients,
    ClientList
}