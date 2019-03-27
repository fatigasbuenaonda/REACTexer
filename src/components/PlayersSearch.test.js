import React from 'react';
import {shallow} from 'enzyme';
import PlayersSearch from './PlayersSearch';


it ('renders all the players when search store is empty (no filter applyed)', () =>{
    const wrapper = shallow(<PlayersSearch players={[]} />);
    expect(wrapper.find("").length).toBe();
});
