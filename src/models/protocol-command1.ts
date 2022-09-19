/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProtocolCommand1 } from './i-protocol-command1';
import { IParamsCommand1 } from './i-params-command1';
import ParamsCommand1 from './params-command1';

type ParamsType = [number, number, string];

type BodyType = { sn: string; par: ParamsType[] };

export default class ProtocolCommand1 implements IProtocolCommand1 {
	par: IParamsCommand1[];

	sn: string;

	constructor(tbody: object) {
		const body = <BodyType>tbody;
		this.sn = body.sn;
		this.par = body.par.map((x) => {
			const parameter = new ParamsCommand1(x[0], x[1], x[2]);
			// this.fillState(parameter);
			return parameter;
		});
	}
}
