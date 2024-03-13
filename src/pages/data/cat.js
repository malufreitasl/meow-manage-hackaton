const { getMongoCollection } = require('./mongodb')
const collectionName = "cat"
const { ObjectId } = require('mongodb');

async function loadAllCats() {
    const collection = await getMongoCollection(collectionName);
    const allCats = await collection.find({});
    return allCats;
}

async function loadCatInfo(id){
    const collection = await getMongoCollection(collectionName);
    const allCats = await collection.findOne({id : id});
    return allCats;
}

async function updateAddoptedInfo(boolean, id) {
    const collection = await getMongoCollection(collectionName);
    const updatedCat = await collection.updateOne(
        { _id: id }, 
        { $set: { adopted: boolean } } 
    );
    return updatedCat;
}

async function updateAddoptedInfo(boolean, id) {
    const collection = await getMongoCollection(collectionName);
    const updatedCat = await collection.updateOne(
        { _id: id }, 
        { $set: { adopted: boolean } } 
    );
    return updatedCat;
}

async function addCat(catInfo) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.insertOne(
        {
            name: catInfo.name,
            age: catInfo.age,
            entry_date: new Date(),
            sex: catInfo.sex,
            peso: 6,
            image: catInfo.image,
            "adopted": "true",
            "resource": {
                food: 65,
                water: 2,
                "litter": 0.7
              }
        }
    );
    return result.acknowledged;
}

module.exports = { loadAllCats, loadCatInfo, updateAddoptedInfo };