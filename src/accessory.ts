import { AccessoryConfig, AccessoryPlugin, API, CharacteristicValue, Logging, Service } from 'homebridge';
import { MANUFACTURER, MODEL } from './settings';
import { TerneoHeatFloorAccessoryConfig } from './terneoHeatFloorAccessoryConfig';

export default class TerneoHeatFloor implements AccessoryPlugin {
	private readonly log: Logging;

	private readonly name: string;

	private config: TerneoHeatFloorAccessoryConfig;

	private api: API;

	private readonly informationService: Service;

	private readonly thermostatService: Service;

	private Characteristic;

	constructor(log: Logging, config: AccessoryConfig, api: API) {
		this.log = log;
		this.name = config.name;
		this.config = config as TerneoHeatFloorAccessoryConfig;
		this.api = api;
		this.Characteristic = this.api.hap.Characteristic;

		this.informationService = new api.hap.Service.AccessoryInformation()
			.setCharacteristic(api.hap.Characteristic.Manufacturer, MANUFACTURER)
			.setCharacteristic(api.hap.Characteristic.Model, MODEL)
			.setCharacteristic(api.hap.Characteristic.SerialNumber, this.config.serial);

		this.thermostatService = new this.api.hap.Service.Thermostat(this.config.name);
		// this.thermostatService.getCharacteristic(this.api.hap.Characteristic.On)
		//     .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
		//               // GET - bind to the `getOn` method below

		// create handlers for required characteristics
		this.thermostatService
			.getCharacteristic(this.Characteristic.CurrentHeatingCoolingState)
			.onGet(this.handleCurrentHeatingCoolingStateGet.bind(this));

		this.thermostatService
			.getCharacteristic(this.Characteristic.TargetHeatingCoolingState)
			.onGet(this.handleTargetHeatingCoolingStateGet.bind(this))
			.onSet(this.handleTargetHeatingCoolingStateSet.bind(this));

		this.thermostatService.getCharacteristic(this.Characteristic.CurrentTemperature).onGet(this.handleCurrentTemperatureGet.bind(this));

		this.thermostatService
			.getCharacteristic(this.Characteristic.TargetTemperature)
			.onGet(this.handleTargetTemperatureGet.bind(this))
			.onSet(this.handleTargetTemperatureSet.bind(this));

		this.thermostatService
			.getCharacteristic(this.Characteristic.TemperatureDisplayUnits)
			.onGet(this.handleTemperatureDisplayUnitsGet.bind(this))
			.onSet(this.handleTemperatureDisplayUnitsSet.bind(this));

		log.info('Terneo floor finished initializing!');
		log.info(`host:${this.config.host}`);
		log.info(`serial:${this.config.serial}`);
		this.status = false;
	}

	private status: boolean;

	handleCurrentHeatingCoolingStateGet() {
		this.log.debug('Triggered GET CurrentHeatingCoolingState');

		// set this to a valid value for CurrentHeatingCoolingState
		const currentValue = this.Characteristic.CurrentHeatingCoolingState.OFF;

		return currentValue;
	}

	handleTargetHeatingCoolingStateGet() {
		this.log.debug('Triggered GET TargetHeatingCoolingState');

		// set this to a valid value for TargetHeatingCoolingState
		const currentValue = this.Characteristic.TargetHeatingCoolingState.OFF;

		return currentValue;
	}

	handleTargetHeatingCoolingStateSet(value: CharacteristicValue) {
		this.log.debug('Triggered SET TargetHeatingCoolingState:', value);
	}

	handleCurrentTemperatureGet() {
		this.log.debug('Triggered GET CurrentTemperature');

		// set this to a valid value for CurrentTemperature
		const currentValue = -270;

		return currentValue;
	}

	/**
	 * Handle requests to get the current value of the "Target Temperature" characteristic
	 */
	handleTargetTemperatureGet() {
		this.log.debug('Triggered GET TargetTemperature');

		// set this to a valid value for TargetTemperature
		const currentValue = 10;

		return currentValue;
	}

	/**
	 * Handle requests to set the "Target Temperature" characteristic
	 */
	handleTargetTemperatureSet(value: CharacteristicValue) {
		this.log.debug('Triggered SET TargetTemperature:', value);
	}

	/**
	 * Handle requests to get the current value of the "Temperature Display Units" characteristic
	 */
	handleTemperatureDisplayUnitsGet() {
		this.log.debug('Triggered GET TemperatureDisplayUnits');

		// set this to a valid value for TemperatureDisplayUnits
		const currentValue = this.Characteristic.TemperatureDisplayUnits.CELSIUS;

		return currentValue;
	}

	handleTemperatureDisplayUnitsSet(value: CharacteristicValue) {
		this.log.debug('Triggered SET TemperatureDisplayUnits:', value);
	}

	identify(): void {
		this.log('Identify!');
	}

	/*
	 * This method is called directly after creation of this instance.
	 * It should return all services which should be added to the accessory.
	 */
	getServices(): Service[] {
		return [this.thermostatService, this.informationService];
	}
}
