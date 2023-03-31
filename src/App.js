import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React,  {useState, useEffect} from "react";
import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import ThankYouPage from "ThankYouPage.js";

import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import LandingPage from "LandingPage";
import DashboardPage from "DashboardPage";
import Metadata from "./MetadataPage";
import AboutUs from "./AboutUsPage";
import ContactUs from "./ContactUsPage";
import AfnsReport from "./AfnsReport";
import BannerDetail from "./BannerDetail";
import CustodianDetails from "./CustodianDetails";
import HighlightDetail from "./HighlightDetail";
import TopicDetail from "./TopicDetail";
import Datasources from "./DatasourcePage";
import CompareAndAnalyze from './CompareAndAnalyze';
import CountryAndSpecific from './CountryAndSpecific';
import CountryAndSpecificNoData from './CountryAndSpecificNoData';
import PoliciesAndProgrammes from './PoliciesAndProgrammes';
export default function App() {

  return (
    <Router>
    <Switch>
        <Route path="/dashboard/compare-and-analyze">
          <CompareAndAnalyze />
          {/* <MainLandingPage /> */}
        </Route>
        <Route path="/dashboard/country-specific">
          <CountryAndSpecific />
          {/* <MainLandingPage /> */}
        </Route>
        <Route path="/dashboard/policies-and-programmes">
          <PoliciesAndProgrammes />
          {/* <MainLandingPage /> */}
        </Route>
        <Route path="/data-source/:datatype/:id">
          <Datasources />
        </Route>
        <Route path="/components/:type/:subtype/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/components/:type/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/custodian/:id">
              <CustodianDetails/>
        </Route>
        <Route path="/dashboard/highlight/:id" render={(props) => <HighlightDetail {...props}/>} />
        <Route path="/dashboard/banner/:id" render={(props) => <BannerDetail {...props}/>} />
        <Route path="/thank-you">
          <ThankYouPage />
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>
        <Route path="/indicator-registry">
          <Metadata />
        </Route>
        <Route path="/afns-report/topics/:id">
          <TopicDetail  render={(props) => <HighlightDetail {...props}/>} />
        </Route>
        <Route path="/afns-report">
          <AfnsReport />
        </Route>

        <Route path="/dashboard_old">
          {/* <DashboardPage /> */}
          <MainLandingPage />
        </Route>
       
        <Route path="/dashboard">
        <LandingPage />
          {/* <DashboardPage /> */}
          {/* <MainLandingPage /> */}
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

