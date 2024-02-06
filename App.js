// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import StudentRegistration from './StudentRegistration';
import StudentLogin from './StudentLogin';
import AdminLogin from './AdminLogin';
import StudentDetail from'./StudentDetail';
// import WelcomePage from'./WelcomePage';
import StudentProfilePage from './StudentProfilePage';
import TimetablePage from './TimetablePage';
// import StudentHomePage from './StudentHomePage ';
import ViewTimeTable from './ViewTimeTable';
import WelcomePage from './WelcomePage';
import CalendarPage from './CalendarPage';
// import ProfilePage from './ProfilePage';
// import PortionPage from './PortionPage';
import Profile from './profile';
// import ProtionPage from './PortionPage';
// import PortionCoverdPage from './PortionCoverdPage';
import PortionPage from './PortionPage';
import PortionCoveredPage from './PortionCoverdPage ';
import ChatPage from './ChatPage';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StudentRegistration" component={StudentRegistration} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="StudentDetail" component={StudentDetail} />
        <Stack.Screen name="StudentProfilePage" component={StudentProfilePage} />
        <Stack.Screen name="TimetablePage" component={TimetablePage} />
        {/* <Stack.Screen name="StudentHomePage" component={StudentHomePage} /> */}
        <Stack.Screen name="ViewTimeTable" component={ViewTimeTable} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="CalendarPage" component={CalendarPage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PortionPage" component={PortionPage} />
        <Stack.Screen name="PortionCoverdPage" component={PortionCoveredPage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />

        {/* <Stack.Screen name="ProfilePage" component={ProfilePage} /> */}
        {/* <Stack.Screen name="PortionPage" component={PortionPage} /> */}




        {/* <Stack.Screen name="WelcomePage" component={WelcomePage} /> */}

        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
