/**
 * Este módulo contém uma função para filtrar um conjunto de dados com base em um intervalo de tempo especificado.
 * A função assume que os dados estão em ordem cronológica e que cada ponto de dados tem um campo 'time'.
 */

/**
 * Filtra um array de dados para manter apenas os pontos de dados que estão em intervalos específicos de tempo.
 *
 * @param {Array} data - Um array de objetos representando os dados. Cada objeto deve ter um campo 'time' que é uma string de data e hora.
 * @param {string} interval - Uma string representando o intervalo de tempo para filtragem. Deve estar no formato 'Xh', onde X é o número de horas.
 * @returns {Array} Um array de objetos filtrados, mantendo apenas os pontos de dados que estão no intervalo de tempo especificado.
 */
const filterByInterval = (data, interval) => {
  // Se o intervalo não for especificado ou for 'all', retorna todos os dados sem filtragem.
  if (!interval || interval === 'all') return data;

  // converte o intervalo de string para numero
  const intervalInHours = parseInt(interval.replace('h', ''), 10);
  const intervalInMillis = intervalInHours * 60 * 60 * 1000;

  // reduz o array de dados para manter apenas os pontos de dados que estao no intervalo de tempo
  return data.reduce((filtered, current) => {
    const currentTime = new Date(current.time).getTime();
    const lastTime = filtered.length > 0 ? new Date(filtered[filtered.length - 1].time).getTime() : 0;

    // Se o ponto de dados atual estiver no intervalo de tempo especificado em relação ao último ponto de dados mantido, adiciona-o ao array filtrado.
    if (currentTime - lastTime >= intervalInMillis || lastTime === 0) {
      filtered.push(current);
    }

    return filtered;
  }, []);
};

module.exports = {
  filterByInterval,
};
