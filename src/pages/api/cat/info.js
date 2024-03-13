import { getCatInfo } from "@/pages/services/cat";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const { id } = req.query; 
            const catInfo = await getCatInfo(id);
            return res.status(200).json(catInfo);
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}