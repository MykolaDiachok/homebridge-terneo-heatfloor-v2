import {
    AccessoryConfig,
    AccessoryPlugin,
    API,
    Logging,
    Service,
    CharacteristicValue
} from "homebridge";
import { MANU_FACTURER, MODEL } from './settings';
import superagent from "superagent";




export interface TerneoHeatFloorAccessoryConfig extends AccessoryConfig {
    host: string;
    serial: string;
}

export class ExampleSwitch implements AccessoryPlugin {

    private readonly log: Logging;
    private readonly name: string;
    private config: TerneoHeatFloorAccessoryConfig;
    private api: API;

    private informationService: Service;
    private switchService: Service;

    constructor(log: Logging, config: AccessoryConfig, api: API) {
        this.log = log;
        this.name = config.name;
        this.config = config as TerneoHeatFloorAccessoryConfig;
        this.api = api;



        this.informationService = new api.hap.Service.AccessoryInformation()
            .setCharacteristic(api.hap.Characteristic.Manufacturer, MANU_FACTURER)
            .setCharacteristic(api.hap.Characteristic.Model, MODEL)
            .setCharacteristic(api.hap.Characteristic.SerialNumber, this.config.serial);


        this.switchService = new this.api.hap.Service.Switch(this.config.name);
        this.switchService.getCharacteristic(this.api.hap.Characteristic.On)
            .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

        log.info("Switch finished initializing!");
        log.info("host:" + this.config.host);
        log.info("serial:" + this.config.serial);
        this.status = false;
    }

    private status: boolean;

    setOn(value: CharacteristicValue) {
        // implement your own code to turn your device on/off
        // this.exampleStates.On = value as boolean;
        this.status = value as boolean;
        let url = 'http://' + this.config.host + '/api.cgi';
        this.log.debug('http->', url);
        const prepareBody = {
            sn: this.config.serial,
            par: [[125, 7, Number(!value).toString()]]
        };
        this.log.debug('prepare body->', prepareBody);

        superagent
            .post(url)
            .send(prepareBody)
            .timeout(5000)
            .then((res) => {
                this.log.debug('response:', res.body)
                this.log.debug('status:', res.status)
                if (res.status === 200) {
                    var parms: Array<Array<{ param: number, type: number, value: string }>> = [[125, 7, "0"], [5, 1, "27"]];
                }
            })
            .catch((error) => {
                this.log.error('Error:', error.message)
            });

        // const response = await fetch(this.config.host + '/api.cgi', {
        //     method: 'get',
        //     body: body,
        //     headers: { 'Content-Type': 'application/json' }
        // });
        // const data = await response.json();
        //this.log.debug('response:', data);
        this.log.debug('Set Characteristic On ->', this.status);
    }


    getOn() {
        // implement your own code to check if the device is on
        // const isOn = this.exampleStates.On;

        this.log.debug('Get Characteristic On ->', this.status);

        return this.status;
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
        return [this.switchService, this.informationService];
    }

}