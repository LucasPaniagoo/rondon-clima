
import { useState, useEffect } from "react";
import MainCard from "../components/MainCard/MainCard";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import '../styles/forecast.css';
import getForecast from "../services/api";
import weatherIcons from "../assets/icons";


interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  code: number;
  icon: string;
}
const formatDate = (dateString: string) => {
  const [, month, day] = dateString.split("-");
  return `${day}/${month}`;
};

export default function Forecast(){
  const [info, setInfo] = useState({
    latitude: 0,
    longitude: 0,
    timezone: "0",
  });
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getForecast();
        setInfo({
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
        })
        // A API retorna arrays, então precisamos "montar" os objetos dia a dia
        const days = data.daily.time.map((date: string, index: number) => ({
          
          date: formatDate(date),
          tempMax: Math.floor(data.daily.temperature_2m_max[index]),
          tempMin: Math.floor(data.daily.temperature_2m_min[index]),
          icon: weatherIcons[data.daily.weathercode[index]]?.day.image,
        }));

        setForecast(days);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <p className="loading">Carregando previsão...</p>;
  }

  const mainDay = forecast[0];
  const otherDays = forecast.slice(1);

    return (
        <>
            <main className='main'>
                <div className='selectedCity'>
                    <h1>Rondonópolis, MT</h1>
                    <p><strong>Latitude:</strong> { info.latitude }</p>
                    <p><strong>Longitude:</strong> { info.longitude } </p>
                    <p><strong>Fuso Horário:</strong> {info.timezone} </p>
                    <p><strong>Intervalo de tempo:</strong> 7 dias</p>
                </div>
                <div className='pattern'>
                    <span className='pattern1'></span>
                    <span className='pattern2'></span>
                    <span className='pattern3'></span>
                </div>
                <MainCard 
                    tempMax={mainDay.tempMax}
                    tempMin={mainDay.tempMin}
                    icon={mainDay.icon}
                />
            </main>
            <section className="container">
                <div className="box">
                    {otherDays.map((day, index) => (
                        <WeatherCard
                            key={index}
                            date={day.date}
                            tempMax={day.tempMax}
                            tempMin={day.tempMin}
                            icon={day.icon}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}