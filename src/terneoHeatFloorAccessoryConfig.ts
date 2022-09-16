import { AccessoryConfig } from 'homebridge';

export interface TerneoHeatFloorAccessoryConfig extends AccessoryConfig {
	host: string;
	serial: string;
}
