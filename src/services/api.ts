export default async function getForecast(){
    const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-16.4708&longitude=-54.6356&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Cuiaba"
    );

    if (!response.ok) {
        alert("Um erro ocorreu, volte novamente em alguns minutos.");
        throw new Error("Erro ao buscar previsão do tempo");
    }

    const data = await response.json();
    return data;
}