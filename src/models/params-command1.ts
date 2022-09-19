import { IParamsCommand1 } from './i-params-command1';

export default class ParamsCommand1 implements IParamsCommand1 {
	constructor(Number: number, Type: number, Value: string) {
		this.parNumber = Number;
		this.parType = Type;
		this.parValue = Value;
	}

	parNumber!: number;

	parType!: number;

	parValue!: string;
}
