import './weathercard.css'

interface Props {
  date: string;
  tempMax: number;
  tempMin: number;
  icon: string;
}

export default function WeatherCard({ date, tempMax, tempMin, icon}: Props) {
    return(
        <div className="card">
            <p className="date">{ date }</p>
            <span><img src={ icon } alt="Ilustração do clima" /></span>
            <span className='temp'>
                <p>{  tempMax }°</p>
                <p>{ tempMin }°</p>
            </span>
        </div>
    )
}