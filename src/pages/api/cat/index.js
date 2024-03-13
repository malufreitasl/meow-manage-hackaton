import { getAllCats } from "@/pages/services/cat";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const allCats = await getAllCats();
            return res.status(200).json(allCats)
        }
    } catch (err) {
        console.log(err);
    }
}