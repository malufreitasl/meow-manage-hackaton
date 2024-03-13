import { sumToQuantity } from "@/pages/services/resource";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { name, quantity } = req.body; 
            const resourceSum = await sumToQuantity(name, quantity);
            return res.status(200).json(resourceSum);
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}