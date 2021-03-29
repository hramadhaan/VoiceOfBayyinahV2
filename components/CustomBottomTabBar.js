import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const HomeIcon = (props) => {
  return <Icon {...props} name="home" />;
};

const NewPostIcon = (props) => {
  return <Icon {...props} name="book" />;
};

const CustomBottomTabBar = ({navigation, state}) => {
  return (
    <React.Fragment>
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title="Beranda" icon={HomeIcon} />
        <BottomNavigationTab title="New Post" icon={NewPostIcon} />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default CustomBottomTabBar;
