import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Page404, Podium, DashboardPage } from './Pages';
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true}>
                    <DashboardPage />
                </Route>

                <Route path="/podium" exact={true}>
                    <Podium />
                </Route>

                <Route path='*' exact={true}>
                    <Page404 />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}