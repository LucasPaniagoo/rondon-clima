interface ForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  latitude: number;
  longitude: number;
  timezone: string;
}

interface ForecastParams {
  latitude: number;
  longitude: number;
  timezone: string;
}

export default async function getForecast({
  latitude,
  longitude,
  timezone,
}: ForecastParams): Promise<ForecastResponse> {
  const baseUrl = "https://api.open-meteo.com/v1/forecast";

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    timezone,
    daily: "temperature_2m_max,temperature_2m_min,weathercode",
  });

  const response = await fetch(`${baseUrl}?${params.toString()}`);

  if (!response.ok) {
    alert("Um erro ocorreu, volte novamente em alguns minutos.")
    throw new Error("Erro ao buscar previsão do tempo.");
  }

  return response.json();
}