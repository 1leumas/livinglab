const { getParticlesData } = require("../repositories/getParticlesData");

async function latestDataUseCase() {
  try {
    const data = await getParticlesData();
    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

module.exports =  latestDataUseCase;
