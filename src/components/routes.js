import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import DragonList from '../pages/DragonList';
import Details from '../pages/Details';
import Edit from '../pages/Edit';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login }/>
        <Route path="/dragons" component={ DragonList } />
        <Route path="/details/:id" component={ Details } />
        <Route path="/Edit/:id" component={ Edit } />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;