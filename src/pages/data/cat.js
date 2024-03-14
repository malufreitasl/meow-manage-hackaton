const { ObjectId } = require('mongodb');
const { getMongoCollection } = require('./mongodb')
const collectionName = "cat"

async function loadAllCats() {
    const collection = await getMongoCollection(collectionName);
    const allCats = await collection.find().toArray();
    return allCats;
}

async function loadCatInfo(id){
    const collection = await getMongoCollection(collectionName);
    const catInfo = await collection.findOne({_id : new ObjectId(id)});
    return catInfo;
}

async function updateAddoptedInfo(id) {
    const collection = await getMongoCollection(collectionName);
    const currentCat = await collection.findOne({ _id: new ObjectId(id) });

    if (!currentCat) {
        throw new Error(`No cat found with id: ${id}`);
    }

    const newAdoptedValue = !currentCat.adopted;

    const updatedCat = await collection.updateOne(
        { _id: new ObjectId(id) }, 
        { $set: { adopted: newAdoptedValue } } 
    );

    return updatedCat;
}

async function insertCat(catInfo) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.insertOne(
        {
            name: catInfo.name,
            age: catInfo.age,
            entry_date: new Date(),
            sex: catInfo.sex,
            weight: catInfo.weight,
            image: catInfo.image,
            adopted: false,
            resource: {
                food: catInfo.weight < 4? 40 : catInfo.weight < 6? 65 : 85,
                water: 2,
                litter: 0.7
            }
        }
    );
    return result.acknowledged;
}

async function sumResourceValues() {
    const collection = await getMongoCollection(collectionName);
    const aggregationResult = await collection.aggregate([
        {
            $match: {
                adopted: false
            }
        },
        {
            $group: {
                _id: null,
                totalFood: { $sum: "$resource.food" },
                totalWater: { $sum: "$resource.water" },
                totalLitter: { $sum: "$resource.litter" }
            }
        }
    ]).toArray();

    if (aggregationResult.length > 0) {
        return {
            totalFood: Math.floor(aggregationResult[0].totalFood),
            totalWater: Math.floor(aggregationResult[0].totalWater),
            totalLitter: Math.floor(aggregationResult[0].totalLitter)
        };
    } else {
        return {
            totalFood: 0,
            totalWater: 0,
            totalLitter: 0
        };
    }
}


module.exports = { loadAllCats, loadCatInfo, updateAddoptedInfo, insertCat, sumResourceValues };