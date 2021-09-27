import { API } from 'homebridge'

import { ACCESSORY_NAME } from './settings'
import { ExampleSwitch  } from './accessory'

export = (api: API) => {
	api.registerAccessory(ACCESSORY_NAME, ExampleSwitch)
}