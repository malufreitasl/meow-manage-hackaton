import { subtractToQuantity } from "@/pages/services/resource";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const {name, quantity} = req.body; 
            console.log(req.body)
            const resourceSubtraction = await subtractToQuantity(name, quantity);
            return res.status(200).json(resourceSubtraction);
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}