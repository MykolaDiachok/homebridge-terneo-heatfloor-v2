import { API } from 'homebridge';

import { ACCESSORY_NAME } from './settings';
import TerneoHeatFloor from './accessory';

export = (api: API) => {
	api.registerAccessory(ACCESSORY_NAME, TerneoHeatFloor);
};
