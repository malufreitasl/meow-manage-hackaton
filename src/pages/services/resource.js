const { loadAllResources, loadResourceQuantity, updateResourceQuantity } = require("../data/resource");
const { getResourcesSum } = require("./cat");
import moment from 'moment';

async function getAllResources() {
    const allResources = await loadAllResources();
    const resourcesSum = await getResourcesSum();

    allResources.forEach(e => {
        if (moment().isAfter(moment(e.last_update).add(24, "hours"))) {
            e.quantity -= resourcesSum[e.name];
            e.last_update = moment();
        }
    });

    return allResources;
}

async function sumToQuantity(name, sumQuantity) {
    const result = updateResourceQuantity(name, sumQuantity, "sum")
    return result;
} 

async function subtractToQuantity(name, subtractQuantity) {
    const result = updateResourceQuantity(name, subtractQuantity, "subtract")
    return result;
} 

async function getResourceQuantity(name) {
    const resourceQuantity = await loadResourceQuantity(name);
    return resourceQuantity;
}

module.exports = { getAllResources, getResourceQuantity, sumToQuantity, subtractToQuantity };