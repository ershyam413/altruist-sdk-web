import React from 'react';
import {
  useLocation
} from "react-router-dom";

import Altruist from 'altruist-sdk-web';

const Location = (props) => {
  const location = useLocation();

  React.useEffect(() => {
    //You can also check for page redirect logic or going back/forward from the browser logic here
    //Check if pathname is not changing dont track the view
    //So that you dont end up tracking the same view again and again
    Altruist.q.push(['track_pageview', location.pathname]);
    // Initialize rating widget popup by current page/pathname
    Altruist.q.push(['initializeRatingWidgets']);
  }, [location]);

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default Location;
