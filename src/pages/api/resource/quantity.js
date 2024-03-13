import { getResourceQuantity } from "@/pages/services/resource";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { name } = req.body; 
            const resourceQuantity = await getResourceQuantity(name);
            return res.status(200).json(resourceQuantity);
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}