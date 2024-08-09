import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	getHello(): any {
		return {
			server:"Production API",
			status:"Ok",
		}
	}
}