import {Link} from 'react-router-dom';

function NotFound(): JSX.Element {
  return (

    <div>
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную страницу</Link>
    </div>

  );

}

export default NotFound;
