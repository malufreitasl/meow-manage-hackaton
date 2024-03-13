const { loadAllCats, loadCatInfo, updateAddoptedInfo, sumResourceValues, insertCat } = require("../data/cat");

async function getAllCats() {
    const allCats = await loadAllCats();
    return allCats;
}

async function getCatInfo(id) {
    const catInfo =  await loadCatInfo(id);
    return catInfo;
}

async function changeAdoptedStatus(id) {
    const catInfo =  await updateAddoptedInfo(id);
    return catInfo;
}

async function addCat(catInfo) {
    const addCatInfo = insertCat(catInfo);
    return addCatInfo;
}

async function getResourcesSum() {
    const catInfo = await sumResourceValues();
    return catInfo;
}

module.exports = { getAllCats, getCatInfo, changeAdoptedStatus, getResourcesSum, addCat }