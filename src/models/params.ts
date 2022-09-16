import { Iparams } from './iparams';

export default class Params implements Iparams {
	constructor(Number: number, Type: number, Value: string) {
		this.parNumber = Number;
		this.parType = Type;
		this.parValue = Value;
	}

	parNumber!: number;

	parType!: number;

	parValue!: string;
}
