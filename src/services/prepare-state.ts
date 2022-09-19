import HeaterState from '../models/heater-state';
import { IProtocolCommand1 } from '../models/i-protocol-command1';
import { BodyType4 } from '../models/i-protocol-command4';

export default class PrepareState {
	public static getDefaultState(protocol1: IProtocolCommand1, protocol4: BodyType4): HeaterState {
		const state = {} as HeaterState;
		state.serialNumber = protocol1.sn;
		Object.assign(state, PrepareState.fillStateFromCommand1(protocol1, state));
		Object.assign(state, PrepareState.fillStateFromCommand4(protocol4, state));
		return state;
	}

	private static fillStateFromCommand1(protocol: IProtocolCommand1, inputState: HeaterState): HeaterState {
		const state = { ...inputState };
		protocol.par.forEach((parameter) => {
			switch (parameter.parNumber) {
				case 125:
					state.powerOff = parameter.parValue === '1';
					break;
				case 124:
					state.childrenLock = parameter.parValue === '1';
					break;
				case 122:
					state.windowOpenControl = parameter.parValue === '1';
					break;
				case 121:
					state.preControl = parameter.parValue === '1';
					break;
				case 120:
					state.useNightBright = parameter.parValue === '1';
					break;
				case 118:
					state.coolingControlWay = parameter.parValue === '1';
					break;
				case 117:
					state.NCContactControl = parameter.parValue === '1';
					break;
				case 116:
					state.useContactorControl = parameter.parValue === '1';
					break;
				case 115:
					state.cloudBlock = parameter.parValue === '1';
					break;
				case 114:
					state.androidBlock = parameter.parValue === '1';
					break;
				case 113:
					state.voltageStableDelay = parameter.parValue === '1';
					break;
				case 112:
					state.proMode = parameter.parValue === '1';
					break;
				case 55:
					state.relayOnTimeLimit = parseInt(parameter.parValue, 10);
					break;
				case 54:
					state.wifiPower = parseInt(parameter.parValue, 10);
					break;
				case 53:
					state.nightBrightEnd = parseInt(parameter.parValue, 10);
					break;
				case 52:
					state.nightBrightStart = parseInt(parameter.parValue, 10);
					break;
				case 51:
					state.sensorСontrolNumber = parseInt(parameter.parValue, 10);
					break;
				case 50:
					state.showType = parseInt(parameter.parValue, 10);
					break;
				case 49:
					state.powerType = parseInt(parameter.parValue, 10);
					break;
				case 34:
					state.lowerAirLimit = parseInt(parameter.parValue, 10);
					break;
				case 33:
					state.upperAirLimit = parseInt(parameter.parValue, 10);
					break;
				case 31:
					state.setTemperature = parseInt(parameter.parValue, 10);
					break;
				case 29:
					state.tempTemperature = parseInt(parameter.parValue, 10);
					break;
				case 27:
					state.lowerLimit = parseInt(parameter.parValue, 10);
					break;
				case 26:
					state.upperLimit = parseInt(parameter.parValue, 10);
					break;
				case 23:
					state.brightness = parseInt(parameter.parValue, 10);
					break;
				case 17:
					state.power = parseInt(parameter.parValue, 10);
					break;
				case 15:
					state.maxTempAdvancedMode = parseInt(parameter.parValue, 10);
					break;
				case 14:
					state.minTempAdvancedMode = parseInt(parameter.parValue, 10);
					break;
				case 7:
					state.awayFloorTemperature = parseInt(parameter.parValue, 10);
					break;
				case 6:
					state.awayAirTemperature = parseInt(parameter.parValue, 10);
					break;
				case 5:
					state.manualFloorTemperature = parseInt(parameter.parValue, 10);
					break;
				case 4:
					state.manualAir = parseInt(parameter.parValue, 10);
					break;
				case 3:
					state.controlType = parseInt(parameter.parValue, 10);
					break;
				case 2:
					state.mode = parseInt(parameter.parValue, 10);
					break;
				case 1:
					state.endAwayTime = parseInt(parameter.parValue, 10);
					break;
				case 0:
					state.startAwayTime = parseInt(parameter.parValue, 10);
					break;
				default:
					break;
			}
		});
		return state;
	}

	private static fillStateFromCommand4(protocol: BodyType4, inputState: HeaterState): HeaterState {
		const state = { ...inputState };
		const keys = Object.keys(protocol);
		keys.forEach((key) => {
			switch (key) {
				case 't.1':
					state.currentTemperature = parseInt(Reflect.get(protocol, key), 10) / 16;
					break;
				case 't.5':
					state.targetTemperature = parseInt(Reflect.get(protocol, key), 10) / 16;
					break;
				case 'f.0':
					state.warming = Reflect.get(protocol, key) === '1';
					break;
				case 'm.3':
					state.blockingType = parseInt(Reflect.get(protocol, key), 10);
					break;
				default:
					break;
			}
		});
		return state;
	}
}
