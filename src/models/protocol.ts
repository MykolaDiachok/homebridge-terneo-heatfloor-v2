/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProtocol } from './IProtocol';
import { Iparams } from './iparams';
import Params from './params';
import HeaterState from './heaterstate';

export default class Protocol implements IProtocol {
	par: Iparams[];

	sn: string;

	state: HeaterState;

	constructor(body: any) {
		this.state = new HeaterState();
		this.sn = body.sn;
		this.par = body.par.map((x: any[]) => {
			const parameter = new Params(x[0], x[1], x[2]);
			this.fillState(parameter);
			return parameter;
		});
	}

	private fillState(parameter: Params) {
		switch (parameter.parNumber) {
			case 125:
				this.state.powerOff = parameter.parValue === '1';
				break;
			case 124:
				this.state.childrenLock = parameter.parValue === '1';
				break;
			case 122:
				this.state.windowOpenControl = parameter.parValue === '1';
				break;
			case 121:
				this.state.preControl = parameter.parValue === '1';
				break;
			case 120:
				this.state.useNightBright = parameter.parValue === '1';
				break;
			case 118:
				this.state.coolingControlWay = parameter.parValue === '1';
				break;
			case 117:
				this.state.NCContactControl = parameter.parValue === '1';
				break;
			case 116:
				this.state.useContactorControl = parameter.parValue === '1';
				break;
			case 115:
				this.state.cloudBlock = parameter.parValue === '1';
				break;
			case 114:
				this.state.androidBlock = parameter.parValue === '1';
				break;
			case 113:
				this.state.voltageStableDelay = parameter.parValue === '1';
				break;
			case 112:
				this.state.proMode = parameter.parValue === '1';
				break;
			case 55:
				this.state.relayOnTimeLimit = parseInt(parameter.parValue, 10);
				break;
			case 54:
				this.state.wifiPower = parseInt(parameter.parValue, 10);
				break;
			case 53:
				this.state.nightBrightEnd = parseInt(parameter.parValue, 10);
				break;
			case 52:
				this.state.nightBrightStart = parseInt(parameter.parValue, 10);
				break;
			case 51:
				this.state.sensorСontrolNumber = parseInt(parameter.parValue, 10);
				break;
			case 50:
				this.state.showType = parseInt(parameter.parValue, 10);
				break;
			case 49:
				this.state.powerType = parseInt(parameter.parValue, 10);
				break;
			case 34:
				this.state.lowerAirLimit = parseInt(parameter.parValue, 10);
				break;
			case 33:
				this.state.upperAirLimit = parseInt(parameter.parValue, 10);
				break;
			case 31:
				this.state.setTemperature = parseInt(parameter.parValue, 10);
				break;
			case 29:
				this.state.tempTemperature = parseInt(parameter.parValue, 10);
				break;
			case 27:
				this.state.lowerLimit = parseInt(parameter.parValue, 10);
				break;
			case 26:
				this.state.upperLimit = parseInt(parameter.parValue, 10);
				break;
			case 23:
				this.state.brightness = parseInt(parameter.parValue, 10);
				break;
			case 17:
				this.state.power = parseInt(parameter.parValue, 10);
				break;
			case 15:
				this.state.maxTempAdvancedMode = parseInt(parameter.parValue, 10);
				break;
			case 14:
				this.state.minTempAdvancedMode = parseInt(parameter.parValue, 10);
				break;
			case 7:
				this.state.awayFloorTemperature = parseInt(parameter.parValue, 10);
				break;
			case 6:
				this.state.awayAirTemperature = parseInt(parameter.parValue, 10);
				break;
			case 5:
				this.state.manualFloorTemperature = parseInt(parameter.parValue, 10);
				break;
			case 4:
				this.state.manualAir = parseInt(parameter.parValue, 10);
				break;
			case 3:
				this.state.controlType = parseInt(parameter.parValue, 10);
				break;
			case 2:
				this.state.mode = parseInt(parameter.parValue, 10);
				break;
			case 1:
				this.state.endAwayTime = parseInt(parameter.parValue, 10);
				break;
			case 0:
				this.state.startAwayTime = parseInt(parameter.parValue, 10);
				break;
			default:
				break;
		}
	}
}
