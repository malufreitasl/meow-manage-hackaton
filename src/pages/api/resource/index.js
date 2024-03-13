import { getAllResources } from "@/pages/services/resource";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const allResources = await getAllResources();
            return res.status(200).json(allResources);
        }
    } catch (err) {
        console.log(err);
    }
}