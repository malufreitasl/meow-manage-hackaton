const { ObjectId } = require('mongodb');
const { getMongoCollection } = require('./mongodb')
const collectionName = "resource"

async function loadAllResources() {
    const collection = await getMongoCollection(collectionName);
    const allResources = await collection.find().toArray();
    return allResources;
}

async function updateResourceQuantity(name, sumQuantity, operation) {
    const collection = await getMongoCollection(collectionName);
    const currentResource = await collection.findOne({ name: name });

    if (!currentResource) {
        throw new Error(`No resource found with name: ${name}`);
    }
    
    let newQuantity;
    if (operation === 'sum') {
        newQuantity = currentResource.quantity + sumQuantity;
    } else if (operation === 'subtract') {
        newQuantity = currentResource.quantity - sumQuantity;
        if(newQuantity < 0) {
            newQuantity = 0;
        }
    } else {
        throw new Error('Invalid operation. Valid operations are "sum" and "subtract".');
    }

    const result = await collection.updateOne(
        { name: name }, 
        { $set: { quantity: newQuantity } } 
    );

    return result;
}

async function loadResourceQuantity(name) {
    const collection = await getMongoCollection(collectionName);
    const allResourceQuantity = await collection.findOne({name: name});
    return allResourceQuantity;
}

module.exports = { loadAllResources, updateResourceQuantity, loadResourceQuantity };