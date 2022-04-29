import {GuitarsData} from '../../types/guitar';
import GuitarCard from '../guitar-card/guitar-card';

type GuitarsCardsListProps = {
    guitars: GuitarsData
}

function GuitarsCardsList({guitars}: GuitarsCardsListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => <GuitarCard key={guitar.id} guitar={guitar} />,
      )}
    </div>
  );
}

export default GuitarsCardsList;
