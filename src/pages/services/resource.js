const { loadAllResources, loadResourceQuantity, updateResourceQuantity } = require("../data/resource");

async function getAllResources() {
    const allResources = await loadAllResources();
    //Carrega os gastos diarios
    //PAra cada um dos recursos
        //Se a ultima alteracao foi a moment - 24 horas 
            //Remove o gasto diario do recurso
            //Atualiza a ultima alteracao
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