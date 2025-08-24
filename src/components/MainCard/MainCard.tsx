import './maincard.css'

interface Props {
  tempMax: number;
  tempMin: number;
  icon: string;
}

export default function MainCard({tempMax, tempMin, icon}: Props){
    return (
        <div className='mainCard'>
          <p> Hoje </p>
          <span><img src={ icon } alt="Representação do clima em imagem" /></span>
          <span className='temperature'>
            <p> { tempMax }°</p>
            <p> { tempMin }°</p>
          </span>
        </div>
    )
}