import {
    AccessoryConfig,
    AccessoryPlugin,
    API,
    Logging,
    Service
} from "homebridge";
import { MANU_FACTURER, MODEL } from './settings';



export interface TerneoHeatFloorAccessoryConfig extends AccessoryConfig {
    ipAddress: string;
}

export class ExampleSwitch implements AccessoryPlugin {

    private readonly log: Logging;
    private readonly name: string;
    private config: TerneoHeatFloorAccessoryConfig;
    private api: API;

    private informationService: Service;
    public readonly switchService: any

    constructor(log: Logging, config: AccessoryConfig, api: API) {
        this.log = log;
        this.name = config.name;
        this.config = config as TerneoHeatFloorAccessoryConfig;
        this.api = api;

        this.informationService = new api.hap.Service.AccessoryInformation()
            .setCharacteristic(api.hap.Characteristic.Manufacturer, MANU_FACTURER)
            .setCharacteristic(api.hap.Characteristic.Model, MODEL);

        this.switchService = new this.api.hap.Service.Switch(this.config.name)

        this.switchService.getCharacteristic(this.api.hap.Characteristic.On)
            .on('get', this.getOnHandler.bind(this))
            .on('set', this.setOnHandler.bind(this))

        log.info("Switch finished initializing!");
    }

    getOnHandler(callback: any) {
        const on = true
        this.log.info('Getting switch state: ', on)
        callback(null, on)
    }

    setOnHandler(value: boolean, callback: any) {
        this.log.info('Setting switch state to: ', value)
        callback(null)
    }

    /*
     * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
     * Typical this only ever happens at the pairing process.
     */
    identify(): void {
        this.log("Identify!");
    }

    /*
     * This method is called directly after creation of this instance.
     * It should return all services which should be added to the accessory.
     */
    getServices(): Service[] {
        return [
            this.informationService,
            this.switchService,
        ];
    }

}