import { addCat } from "@/pages/services/cat";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const catInfo = req.body; 
            const addCatInfo = await addCat(catInfo);
            return res.status(200).json(addCatInfo);
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}