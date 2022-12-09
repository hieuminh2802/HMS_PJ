import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from '../../Layouts/Frontend/Navbar';

import Publicroutelist from '../../Routes/Publicroutelist';

const FrontendLayout = () => {
    return (
        <div>
            <Navbar/>
                <div>
                    <Switch>
                        {Publicroutelist.map((routedata, idx) => {
                            return(
                                routedata.component && (
                                    <Route
                                        key={idx}
                                        path={routedata.path}
                                        exact={routedata.exact}
                                        name={routedata.name}
                                        render={(props) => (
                                            <routedata.component {...props} />
                                        )}
                                    />
                                )
                            )
                        })}
                    </Switch>
                </div>
        </div>
    );
}
 
export default FrontendLayout;